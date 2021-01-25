import React from "react"
import map from "./map"
import each from "./each"
import Api from "./Api"
import { compose } from "redux"
import { connect } from "react-redux"

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
    let options = givenObject.options !== undefined ? givenObject.options : { name: "call", bindAll: false }
    options.name = options.name !== undefined ? options.name : "call"
    options.bindAll = options.bindAll !== undefined ? options.bindAll : false
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
        thunkActions[thunk] = (...args) => (dispatch, getState) =>
            thunks[thunk](...args)((name, ...args) => performDispatch(dispatch, name)(...args), getState, ...args)
    })

    /**
     * Attach generic thunk caller
     */
    thunkActions[options.name] = (name, ...args) => (dispatch, getState) => performDispatch(dispatch, name)(...args)

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
            if (args.length === 0 && hocFusion.length === 0 && options.bindAll === false && fusion.length === 0) {
                return hasApi === true ? apiHoc(withReactizy(Component, ...fusion)) : withReactizy(Component, ...fusion)
            }

            /**
             * Attach redux state and action to Component
             */
            const checkReduxers = (GivenComponent, givenState = [], givenThunks = []) => {
                let reduxers = [...givenState]
                let newThunks = {}

                if (givenThunks.length > 0) {
                    newThunks = {}
                    each([...givenThunks], thunk => {
                        if (thunkActions[thunk] !== undefined) {
                            newThunks[thunk] = thunkActions[thunk]
                        }
                    })
                }

                GivenComponent.thunkOptions = options

                /**
                 * Perform redux state to props
                 */
                const mapStateToProps = state => {
                    let properties = {}

                    each(reduxers, property => {
                        properties[property] = state[property]
                    })

                    return properties
                }

                /**
                 * Check if must be connected to redux
                 */
                const checkConnect = () => givenState.length > 0 || givenThunks.length > 0

                /**
                 * Return Final Component
                 */

                const FinalComponent = withReactizy(GivenComponent, ...hocFusion, ...fusion)

                return {
                    api: hasApi === true,
                    connect: checkConnect() === false ? null : [mapStateToProps, newThunks],
                    component: FinalComponent,
                }
            }

            /**
             * Attach HOC from args
             */
            const getUses = givenArgs => {
                const parseUseItem = item => (hocs[item] !== undefined ? hocs[item] : hocCreator(item, customs[item]))

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

            if (options.bindAll === true) {
                pool.use = [...Object.keys(hocs), ...Object.keys(customs)]
                pool.state = [...reduxStateKeys]
                pool.actions = [...Object.keys(thunkActions)]
            } else {
                each(args, key => {
                    if (hocs[key] !== undefined || customs[key] !== undefined) {
                        pool.use.push(key)
                    } else if (reduxStateKeys.indexOf(key) !== -1) {
                        pool.state.push(key)
                    } else if (thunkActions[key] !== undefined) {
                        pool.actions.push(key)
                    }
                })

                /**
                 * Attach Given Fusions
                 */
                each([...fusion, ...(mergeHocFusion === true ? hocFusion : [])], part => {
                    if (part.hoc === undefined) {
                        return
                    }

                    each(part.hoc, key => {
                        if (hocs[key] !== undefined || customs[key] !== undefined) {
                            pool.use.push(key)
                        } else if (reduxStateKeys.indexOf(key) !== -1 && pool.state.indexOf(key) === -1) {
                            pool.state.push(key)
                        } else if (thunkActions[key] !== undefined && pool.actions.indexOf(key) === -1) {
                            pool.actions.push(key)
                        }
                    })
                })
            }

            /**
             * Retrive final hocs, and component
             */
            const finalData = checkReduxers(Component, pool.state, pool.actions)

            let hocsToUse = pool.use.length === 0 ? [] : getUses([...pool.use])

            if (finalData.api === true) {
                hocsToUse.push(ApiHoc)
            }

            if (finalData.connect !== null) {
                hocsToUse.unshift(connect(...finalData.connect))
            }

            return hocsToUse.length === 0 ? finalData.component : compose(...hocsToUse)(finalData.component)
        }
    }

    hocFunction.reduxers = initialReduxers

    return hocFunction
}

export default builder
