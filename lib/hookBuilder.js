import React, { useEffect, useState } from "react"
import root from "./baseBuilder"
import each from "./each"
import { useSelector, useDispatch } from "react-redux"

const builder = (givenObject = {}) => {
    const hocs = givenObject.hocs || {}
    const givenApis = givenObject.apis || []
    const commons = givenObject.commons || []
    let options = givenObject.options || { name: "call", bindAll: false }
    options.name = options.name || "call"
    options.bindAll = options.bindAll || false
    let initialReduxers = givenObject.reduxers !== undefined ? [...givenObject.reduxers] : []
    let [combined, combinedNames] = root.getCombinedReducers(initialReduxers)

    /**
     * Perform Api and ApiHoc
     */
    let [hasApi, apiFunctions, apiHoc] = root.performApi(givenApis)

    const apiMethod = { call: apiFunctions(), url: apiFunctions(true) }

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
            dispatch(reduxThunks[name] !== undefined ? getThunkActions()[name](payload, ...args) : { type: name, payload })

    /**
     * Proceed Combined Reducer Thunks
     */

    const reduxCombinedThunks = root.getReduxCombinedThunks(givenReduxCombinedThunks, performDispatch)

    /**
     * Proceed Hoc thunks to conformize with redux-thunk
     */
    const thunkActions = root.getThunksActions(reduxThunks, performDispatch, reduxActionsKeys, options.name)

    function getThunkActions() {
        return { ...thunkActions }
    }

    const extractArgs = (givenArgs = []) => {
        let pool = {
            state: [],
            actions: [],
            combined: [],
        }

        each(givenArgs, key => {
            if (combinedNames.indexOf(key) !== -1 || reduxStateKeys.indexOf(key) !== -1) {
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

    const hookFunction = (...args) => {
        let pool = extractArgs(args)

        if (options.bindAll === true || (args.length === 1 && args[0] === true)) {
            pool.state = [...reduxStateKeys]
            pool.actions = [...Object.keys(thunkActions)]
            pool.combined = [...combinedNames]
        }

        const dispatch = useDispatch()

        const reduxState = useSelector(state => {
            let data = {}

            pool.state.forEach(stateKey => (data[stateKey] = state[stateKey]))

            pool.actions.forEach(
                actionName => (data[actionName] = (...actionArgs) => dispatch(thunkActions[actionName](...actionArgs)))
            )

            pool.combined.forEach(combinedName => {
                let combined = { ...state[combinedName] }

                each(Object.keys(reduxCombinedActions[combinedName]), longName => {
                    combined[longName.replace(`${combinedName}.`, "")] = (...args) =>
                        dispatch(reduxCombinedActions[combinedName][longName](...args))
                })

                each(Object.keys(givenReduxCombinedThunks[combinedName]), longName => {
                    combined[longName] = (...args) =>
                        dispatch(reduxCombinedThunks[combinedName][`${combinedName}.${longName}`](...args))
                })

                data[combinedName] = combined
            })

            return data
        })

        let dataToReturn = {
            api: apiMethod,
            ...reduxState,
        }

        commons.forEach(common => {
            dataToReturn = {
                ...dataToReturn,
                ...common(),
            }
        })

        return dataToReturn
    }

    hookFunction.reduxers = initialReduxers

    hookFunction.displayName = "Reactizy_Hook"

    return hookFunction
}

export default builder
