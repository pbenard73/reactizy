import map from "./map"
import each from "./each"

import { compose } from "redux"

import withReactizy from "./highOrderComponent"
import hocCreator from "./hocCreator"

export default (givenObject = {}) => {
    const hocs = givenObject.hocs !== undefined ? givenObject.hocs : {}
    const customs = givenObject.customs !== undefined ? givenObject.customs : {}
    const thunks = givenObject.thunks !== undefined ? givenObject.thunks : {}
    let hocFusion = givenObject.fusion !== undefined ? [...givenObject.fusion] : []
    const options = givenObject.options !== undefined ? givenObject.options : { name: "call" }
    const keyPool = Object.keys({ ...hocs, ...customs })
    let cleanedFusion = []

    const concatUniqHoc = () => {
        let data = {
            hocs: [],
            reduxers: [],
            actions: [],
        }

        each(hocFusion, Hoc => {
            each(Object.keys(data), field => {
                const to = Hoc[field] === undefined ? [] : Hoc[field]

                each(to, item => {
                    if (data[field].indexOf(item) === -1) {
                        data[field].push(item)
                    }
                })
            })

            cleanedFusion.push(Hoc.component)
        })

        return data
    }

    let hocFusionData = concatUniqHoc()

    /**
     * Override readux-thunk dispatch
     */
    const performDispatch = (dispatch, name) => {
        if (thunks[name] !== undefined) {
            return (...args) => dispatch(getThunkActions()[name](...args))
        }

        return payload => dispatch({ type: name, payload })
    }

    /**
     * Proceed Hoc thunks to conformize with redux-thunk
     */
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

    /**
     * Return Method that'll generate the Hoc
     */
    return (...args) => (NoFusionComponent, ...componentOrFusion) => {
        let Component = NoFusionComponent
        let fusion = componentOrFusion
        let mergeHocFusion = true

        /**
         * Merge hoc fusion
         */
        if (NoFusionComponent === false && componentOrFusion.length > 0) {
            mergeHocFusion = false
            let [newComponent, ...newFusion] = fusion
            Component = newComponent
            fusion = newFusion
        }

        /**
         * Return reactizy if nothing to proceed
         */
        if (args.length === 0 && hocFusionData.hocs.length === 0) {
            return withReactizy(Component, ...fusion)
        }

        const isHocFirst = args.length === 0 || args[0].length === 0 || keyPool.indexOf(args[0][0]) !== -1

        /**
         * Attach redux state and action to Component
         */
        const checkReduxers = (GivenComponent, givenState = [], givenThunks = []) => {
            let reduxers = [...givenState, ...hocFusionData.reduxers]
            let newThunks = {}

            if (givenThunks === true) {
                newThunks = thunkActions
            } else if (givenThunks.length > 0 || hocFusionData.actions.length > 0) {
                newThunks = {}
                each([...givenThunks, ...hocFusionData.actions], thunk => {
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

            const hocFusion = mergeHocFusion === true ? map(cleanedFusion, split => split()) : []

            return withReactizy(GivenComponent, ...fusion, ...hocFusion)
        }

        /**
         * Attach HOC from args
         */
        const getUses = givenArgs => {
            const parseUseItem = item => {
                if (hocs[item] !== undefined) {
                    return hocs[item]
                }

                if (customs[item] !== undefined) {
                    return hocCreator(item, customs[item])
                }

                return null
            }

            let uniqArgs = []
            each(givenArgs, item => {
                if (uniqArgs.indexOf(item) === -1) {
                    uniqArgs.push(item)
                }
            })

            return map(uniqArgs, parseUseItem)
        }

        /**
         * Retrieve state and action from args
         */
        const guessStateOrThunk = (statesOrThunks = [], thunks = []) => {
            if (thunks.length === 0 && statesOrThunks === true) {
                return [[], true]
            }

            if (statesOrThunks.length > 0 && thunkActions[statesOrThunks[0]] !== undefined) {
                return [[], statesOrThunks]
            }

            return [statesOrThunks, thunks]
        }

        /**
         * If has HOC then return compose
         */
        if (isHocFirst === true) {
            let [use = [], state = [], thunks = []] = args
            let uses = [...use, ...hocFusionData.hocs]

            return args.length > 1
                ? compose(...getUses(uses))(checkReduxers(Component, ...guessStateOrThunk(state, thunks)))
                : compose(...getUses(uses))(checkReduxers(Component))
        } else if (hocFusionData.hocs.length > 0) {
            let [state = [], thunks = []] = args
            let uses = [...hocFusionData.hocs]

            return args.length > 0
                ? compose(...getUses(uses))(checkReduxers(Component, ...guessStateOrThunk(state, thunks)))
                : compose(...getUses(uses))(checkReduxers(Component))
        }

        return checkReduxers(Component, ...guessStateOrThunk(...args))
    }
}
