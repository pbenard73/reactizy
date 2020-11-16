import map from "./map"
import each from "./each"

import { compose } from "redux"

import withReactizy from "./highOrderComponent"
import hocCreator from "./hocCreator"

export default (pool = {}, buildable = {}, thunks = {}, options = {name: 'call'}) => (...args) => {
    const keyPool = Object.keys({ ...pool, ...buildable })


    const performDispatch = (dispatch, name) => {
        if (thunks[name] !== undefined) {
            return (...args) => dispatch(getThunkActions()[name](...args))
        }

        return payload => dispatch({type: name, payload})
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
            call: (type, payload) => ({type, payload}),
        }
    }

    return (Component, ...fusion) => {
        if (args.length === 0) {
            return withReactizy(Component, ...fusion)
        }


        const isHocFirst = keyPool.indexOf(args[0][0]) !== -1
        const isArray = subject => subject.constructor.name.toLowerCase() === "array"

        let usesReduxers = []

        const checkReduxers = (GivenComponent, givenState = [], givenThunks = []) => {
            let reduxers = [...givenState, ...usesReduxers]
            let newActions = []
            let newThunks = thunkActions

            if (givenThunks.length > 0) {
                newThunks = {}
                each(givenThunks, thunk => {
                    if (thunkActions[thunk] !== undefined) {
                        newThunks[thunk] = thunkActions[thunk]
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

        if (isHocFirst === true && args.length === 1) {
            return compose(...getUses(args[0]))(checkReduxers(Component))
        }

        if (isHocFirst === true && args.length > 1) {
            let [use, state, thunks = []] = args

            if (args.length === 2 && state.length > 0 && thunkActions[state[0]] !== undefined) {
                thunks = [...state]
                state = []
            }

            return compose(...getUses(use))(checkReduxers(Component, state, thunks))
        }

        return checkReduxers(Component, args[0])
    }
}
