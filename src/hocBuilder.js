import map from "./map"
import each from "./each"

import { compose } from "redux"

import withReactizy from "./highOrderComponent"
import hocCreator from "./hocCreator"

export default (givenObject = {}) => (...args) => {
    const pool = givenObject.hocs !== undefined ? givenObject.hocs : {}
    const buildable = givenObject.customs !== undefined ? givenObject.customs : {}
    const thunks = givenObject.thunks !== undefined ? givenObject.thunks : {}
    const options = givenObject.options !== undefined ? givenObject.options : { name: "call" }

    const keyPool = Object.keys({ ...pool, ...buildable })

    const performDispatch = (dispatch, name) => {
        if (thunks[name] !== undefined) {
            return (...args) => dispatch(getThunkActions()[name](...args))
        }

        return payload => dispatch({ type: name, payload })
    }

    let thunkActions = {}
    each(Object.keys(thunks), thunk => {
        thunkActions[thunk] = (...args) => {
            return function (dispatch, getState) {
                thunks[thunk](...args)((name, ...args) => performDispatch(dispatch, name)(...args), getState, ...args)
            }
        }
    })

    function getThunkActions() {
        return {
            ...thunkActions,
            call: (type, payload) => ({ type, payload }),
        }
    }

    return (Component, ...fusion) => {
        if (args.length === 0) {
            return withReactizy(Component, ...fusion)
        }

        const isHocFirst = args[0].length === 0 || keyPool.indexOf(args[0][0]) !== -1

        let usesReduxers = []

        const checkReduxers = (GivenComponent, givenState = [], givenThunks = []) => {
            let reduxers = [...givenState, ...usesReduxers]
            let newThunks = {}

            if (givenThunks === true) {
                newThunks = thunkActions
            } else if (givenThunks.length > 0) {
                newThunks = {}
                each(givenThunks, thunk => {
                    if (thunkActions[thunk] !== undefined) {
                        newThunks[thunk] = thunkActions[thunk]
                    } else {
                        newThunks[thunk] = payload => ({ type: thunk, payload })
                    } 
                })
            }

            GivenComponent.reduxers = reduxers
            GivenComponent.thunks = newThunks
            GivenComponent.thunkOptions = options

            return withReactizy(GivenComponent, ...fusion)
        }

        let extendedHocs = []

        const parseUseItem = item => {
            if (pool[item] !== undefined) {
                return pool[item]
            }

            if (buildable[item] !== undefined) {
                return hocCreator(item, buildable[item])
            }

            return null
        }

        const getUses = givenArgs => {
            return [...map(givenArgs, parseUseItem), ...extendedHocs]
        }

        const guessStateOrThunk = (statesOrThunks = [], thunks = []) => {
            if (thunks.length === 0 && statesOrThunks === true) {
                return [[], true]
            }

            if (statesOrThunks.length > 0 && thunkActions[statesOrThunks[0]] !== undefined) {
                return [[], statesOrThunks]
            }

            return [statesOrThunks, thunks]
        }

        if (isHocFirst === true) {
            let [use, state = [], thunks = []] = args

            return args.length > 1
                ? compose(...getUses(use))(checkReduxers(Component, ...guessStateOrThunk(state, thunks)))
                : compose(...getUses(use))(checkReduxers(Component))
        }

        return checkReduxers(Component, ...guessStateOrThunk(...args))
    }
}
