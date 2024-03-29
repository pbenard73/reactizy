import React from "react"
import root from "./baseBuilder"
import map from "./map"
import each from "./each"
import { compose } from "redux"
import { connect } from "react-redux"

import withReactizy from "./highOrderComponent"
import hocCreator from "./hocCreator"

const builder = (givenObject = {}) => {
    const hocs = givenObject.hocs || {}
    const customs = givenObject.customs || {}
    const thunks = givenObject.thunks || {}
    const givenApis = givenObject.apis || []
    let hocFusion = givenObject.fusion !== undefined ? [...givenObject.fusion] : []
    let options = givenObject.options || { name: "call", bindAll: false }
    options.name = options.name || "call"
    options.pure = options.pure || "pure"
    options.bindAll = options.bindAll || false
    const keyPool = Object.keys({ ...hocs, ...customs })
    let cleanedFusion = []
    let initialReduxers = givenObject.reduxers !== undefined ? [...givenObject.reduxers] : []
    let [combined, combinedNames] = root.getCombinedReducers(initialReduxers)

    /**
     * Perform Api and ApiHoc
     */
    let [hasApi, apiFunctions] = root.performApi(givenApis)

    const apiHoc = Component => props => <Component {...props} api={{ call: apiFunctions(), url: apiFunctions(true) }} />

    /**
     * Perform Combine Hoc
     */
    const combineHoc =
        (...combines) =>
        Component =>
        props => {
            let newProps = { ...props }
            const clean = (name, combine) => ("" + name).replace(`${combine}.`, "")

            each(combines, combineName => {
                each(Object.keys({ ...reduxCombinedActions[combineName], ...reduxCombinedThunks[combineName] }), name => {
                    newProps[combineName][clean(name, combineName)] = (...args) => props[name](...args)
                    delete newProps[name]
                })
            })

            if (hasApi === true) {
                newProps.api = { call: apiFunctions(), url: apiFunctions(true) }
            }

            return <Component {...newProps} />
        }

    /**
     * Get Redux data from given reduxers
     */
    let [reduxStateKeys, reduxActionsKeys, reduxThunks, reduxCombinedActions, givenReduxCombinedThunks] =
        root.getReduxerData(initialReduxers)

    /**
     * Override redux-thunk dispatch to dispatch simple redux action too
     */
    const performDispatch =
        (dispatch, name) =>
        (payload, ...args) =>
            dispatch(reduxThunks[name] !== undefined ? getThunkActions()[name](payload, ...args) : { type: name, payload: [payload, ...args] })

    /**
     * Proceed Combined Reducer Thunks
     */

    const reduxCombinedThunks = root.getReduxCombinedThunks(givenReduxCombinedThunks, performDispatch)

    const thunkActions = root.getThunksActions(reduxThunks, performDispatch, reduxActionsKeys, options.name)

    /**
     * Attach reduxer actions to actionPool
     */
    each(reduxActionsKeys, actionName => {
        thunkActions[actionName] = (...payload) => ({ type: actionName, payload })
    })

    function getThunkActions() {
        let values = { ...thunkActions }
        Object.values(reduxCombinedActions).forEach(i => {
            values = { ...values, ...i }
        })
        Object.values(reduxCombinedThunks).forEach(i => {
            values = { ...values, ...i }
        })

        return values
    }

    const extractArgs = (givenArgs = []) => {
        let pool = {
            use: [],
            state: [],
            actions: [],
            combined: [],
        }

        each(givenArgs, key => {
            if (hocs[key] !== undefined || customs[key] !== undefined) {
                pool.use.push(key)
            } else if (combinedNames.indexOf(key) !== -1 || reduxStateKeys.indexOf(key) !== -1) {
                if (combinedNames.indexOf(key) !== -1) {
                    pool.combined.push(key)
                }
                pool.state.push(key)
            } else if (thunkActions[key] !== undefined) {
                pool.actions.push(key)
            }
        })

        return pool
    }

    /**
     * Attach redux state and action to Component
     */
    const checkReduxers = (GivenComponent, givenState = [], givenThunks = [], fusion = false, combineds = []) => {
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

        each(combineds, combined => {
            newThunks = { ...newThunks, ...reduxCombinedActions[combined], ...reduxCombinedThunks[combined] }
        })

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

        const FinalComponent = fusion !== false ? withReactizy(GivenComponent, ...hocFusion, ...fusion) : GivenComponent

        return {
            combine: combineds.length > 0,
            api: hasApi === true && combineds.length === 0,
            connect: checkConnect() === false ? null : [mapStateToProps, newThunks],
            component: FinalComponent,
        }
    }

    /**
     * Return Method that'll generate the Hoc
     */
    const hocFunction =
        (...args) =>
        (NoFusionComponent, ...componentOrFusion) => {
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
             * Attach HOC from args
             */
            const getUses = givenArgs => {
                const parseUseItem = item => hocs[item] || hocCreator(item, customs[item])

                return map([...new Set(givenArgs)], parseUseItem)
            }

            /**
             * Retrieve state, action, hocs from args
             */
            let pool = extractArgs()

            if (options.bindAll === true || (args.length === 1 && args[0] === true)) {
                pool.use = [...Object.keys(hocs), ...Object.keys(customs)]
                pool.state = [...reduxStateKeys, ...combinedNames]
                pool.actions = [...Object.keys(thunkActions)]
                pool.combined = [...combinedNames]
            } else {
                pool = extractArgs(args)

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
                        } else if (
                            combinedNames.indexOf(keys) !== -1 ||
                            (reduxStateKeys.indexOf(key) !== -1 && pool.state.indexOf(key) === -1)
                        ) {
                            if (combinedNames.indexOf(key) !== -1) {
                                pool.combined.push(key)
                            }
                            pool.state.push(key)
                        } else if (thunkActions[key] !== undefined && pool.actions.indexOf(key) === -1) {
                            pool.actions.push(key)
                        }
                    })
                })
            }

            /**
             * Retrieve final hocs, and component
             */
            const finalData = checkReduxers(Component, pool.state, pool.actions, fusion, pool.combined)

            let hocsToUse = pool.use.length === 0 ? [] : getUses([...pool.use])

            if (finalData.api === true) {
                hocsToUse.push(apiHoc)
            }

            if (finalData.combine === true) {
                hocsToUse.push(combineHoc(...pool.combined))
            }

            if (finalData.connect !== null) {
                hocsToUse.unshift(connect(...finalData.connect))
            }

            return hocsToUse.length === 0 ? finalData.component : compose(...hocsToUse)(finalData.component)
        }

    hocFunction[options.pure] = (...pureArgs) => {
        const pool = extractArgs(pureArgs)

        return Component => {
            const finalData = checkReduxers(Component, pool.state, pool.actions)

            return finalData.connect !== null ? connect(...finalData.connect)(Component) : Component
        }
    }

    hocFunction.reduxers = initialReduxers

    return hocFunction
}

export default builder
