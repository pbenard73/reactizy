import React from "react"
import map from "./map"
import each from "./each"
import Api from "./Api"
import { compose } from "redux"

import reduxerExtractor from "./reduxerExtractor"
import withReactizy from "./highOrderComponent"
import hocCreator from "./hocCreator"

const builder = (givenObject = {}) => {
    const hocs = givenObject.hocs !== undefined ? givenObject.hocs : {}
    const customs = givenObject.customs !== undefined ? givenObject.customs : {}
    const thunks = givenObject.thunks !== undefined ? givenObject.thunks : {}
    const givenApis = givenObject.apis !== undefined ? givenObject.apis : []
    let initialReduxers = givenObject.reduxers !== undefined ? [...givenObject.reduxers] : []
    let hocFusion = givenObject.fusion !== undefined ? [...givenObject.fusion] : []
    let options = givenObject.options !== undefined ? givenObject.options : { name: "call", permissive: false }
    options.name = options.name !== undefined ? options.name : "call"
    const keyPool = Object.keys({ ...hocs, ...customs })
    let cleanedFusion = []

    /**
     * Permform Api and ApiHoc
     */
    let api = {}
    each(givenApis, apiPool => {
        api = { ...api, ...apiPool }
    })

    const hasApi = Object.keys(api).length > 0

    const apiFunctions = (url = false) => {
        return (routeName, ...args) => {
            let route = api[routeName]

            if (route === undefined) {
                return new Error(`Api route ${routeName} is not registered`)
            }

            return url === false ? Api.call(route, ...args) : Api.url(route, ...args)
        }
    }

    const apiHoc = Component => props => <Component {...props} api={{ call: apiFunctions(), url: apiFunctions(true) }} />

    /**
     * Get Redux data from given reduxers
     */
    const reduxerData = reduxerExtractor(...initialReduxers)
    let reduxStateKeys = reduxerData.state
    let reduxActionsKeys = reduxerData.actions

    /**
     * Get Uniq Hocs
     */
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
     * Override redux-thunk dispatch to dispatch simple redux action too
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

    /**
     * Attach generic thunk caller
     */
    thunkActions[options.name] = (name, ...args) => {
        return function (dispatch, getState) {
            performDispatch(dispatch, name)(...args)
        }
    }

    /**
     * Attach reduxer actions to actionPool
     */
    each(reduxActionsKeys, actionName => {
        thunkActions[actionName] = payload => ({ type: actionName, payload })
    })

    function getThunkActions() {
        return { ...thunkActions }
    }

    /**
     * Return Method that'll generate the Hoc
     */
    const hocFunction = function (...args) {
        return (NoFusionComponent, ...componentOrFusion) => {
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
             * Return reactizy has nothing to proceed
             */
            if (args.length === 0 && hocFusionData.hocs.length === 0) {
                if (hasApi === true) {
                    return apiHoc(withReactizy(Component, ...fusion))
                }

                return withReactizy(Component, ...fusion)
            }

            /**
             * Attach redux state and action to Component
             */
            const checkReduxers = (GivenComponent, givenState = [], givenThunks = []) => {
                let reduxers = [...givenState, ...(mergeHocFusion === true ? hocFusionData.reduxers : [])]
                let newThunks = {}

                if (givenThunks.length > 0 || hocFusionData.actions.length > 0) {
                    newThunks = {}
                    each([...givenThunks, ...hocFusionData.actions], thunk => {
                        if (thunkActions[thunk] !== undefined) {
                            newThunks[thunk] = thunkActions[thunk]
                        }
                    })
                }

                GivenComponent.reduxers = reduxers
                GivenComponent.thunks = newThunks
                GivenComponent.thunkOptions = options

                const hocFusion = mergeHocFusion === true ? map(cleanedFusion, split => split()) : []

                if (hasApi === true) {
                    return apiHoc(withReactizy(GivenComponent, ...hocFusion, ...fusion))
                }

                return withReactizy(GivenComponent, ...hocFusion, ...fusion)
            }

            /**
             * Attach HOC from args
             */
            const getUses = givenArgs => {
                const parseUseItem = item => {
                    if (hocs[item] !== undefined) {
                        return hocs[item]
                    }

                    return hocCreator(item, customs[item])
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
             * Retrieve state, action, hocs from args
             */
            let pool = {
                use: [],
                state: [],
                actions: [],
            }

            each(args, key => {
                if (hocs[key] !== undefined || customs[key] !== undefined) {
                    pool.use.push(key)
                } else if (reduxStateKeys.indexOf(key) !== -1) {
                    pool.state.push(key)
                } else if (thunkActions[key] !== undefined) {
                    pool.actions.push(key)
                }
            })

            if (pool.use.length === 0 && hocFusionData.hocs.length === 0) {
                return checkReduxers(Component, pool.state, pool.actions)
            }

            return compose(...getUses([...pool.use, ...(mergeHocFusion === true ? hocFusionData.hocs : [])]))(
                checkReduxers(Component, pool.state, pool.actions)
            )
        }
    }

    hocFunction.reduxers = initialReduxers

    return hocFunction
}

export default builder
