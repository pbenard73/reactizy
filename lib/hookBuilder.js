import React, { useEffect, useState } from "react"
import map from "./map"
import each from "./each"
import Api from "./Api"
import { useSelector, useDispatch } from "react-redux"

import reduxerExtractor from "./reduxerExtractor"
import withReactizy from "./highOrderComponent"
import hocCreator from "./hocCreator"

const builder = (givenObject = {}) => {
    const hocs = givenObject.hocs || {}
    const givenApis = givenObject.apis || []
    let options = givenObject.options || { name: "call", bindAll: false }
    options.name = options.name || "call"
    options.pure = options.pure || "pure"
    options.bindAll = options.bindAll || false
    let initialReduxers = givenObject.reduxers !== undefined ? [...givenObject.reduxers] : []
    let combined = {}
    let combinedNames = []

    /**
     * Get combined reducers
     */
    each(initialReduxers, reducer => {
        if (reducer.isCombined !== true || reducer.name === undefined) {
            return
        }

        combinedNames.push(reducer.name)

        combined[reducer.name] = reducer.actions
    })

    /**
     * Perform Api and ApiHoc
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

            return url === true ? Api.url(route, ...args) : Api.call(route, ...args)
        }
    }

    const apiMethod = { call: apiFunctions(), url: apiFunctions(true) }

    /**
     * Get Redux data from given reduxers
     */
    const reduxerData = reduxerExtractor(...initialReduxers)
    let reduxStateKeys = reduxerData.state
    let reduxActionsKeys = reduxerData.actions
    let reduxThunks = reduxerData.thunks
    let reduxCombinedActions = reduxerData.combinedActions

    const givenReduxCombinedThunks = reduxerData.combinedThunks

    /**
     * Override redux-thunk dispatch to dispatch simple redux action too
     */
    const performDispatch = (dispatch, name) => (payload, ...args) =>
        dispatch(
            reduxThunks[name] !== undefined
                ? getThunkActions()[name](payload, ...args)
                : { type: name, payload }
        )

    /**
     * Proceed Combined Reducer Thunks
     */

    let reduxCombinedThunks = {}

    each(Object.keys(givenReduxCombinedThunks), combineName => {
        reduxCombinedThunks[combineName] = {}
        const combineThunks = givenReduxCombinedThunks[combineName]
        each(Object.keys(combineThunks), thunk => {
            reduxCombinedThunks[combineName][`${combineName}.${thunk}`] = (...args) => (dispatch, getState) =>
                combineThunks[thunk]((name, ...args) => performDispatch(dispatch, name)(...args), getState, ...args)
        })
    })

    /**
     * Proceed Hoc thunks to conformize with redux-thunk
     */
    let thunkActions = {}

    /**
     * Attach reducer thunk actions
     */
    each(Object.keys(reduxThunks), thunkName => {
        thunkActions[thunkName] = (...args) => (dispatch, getState) =>
            reduxThunks[thunkName]((name, ...args) => performDispatch(dispatch, name)(...args), getState, ...args)
    })

    /**
     * Attach generic thunk caller
     */
    thunkActions[options.name] = (name, ...args) => (dispatch, getState) => performDispatch(dispatch, name)(...args)

    /**
     * Attach reduxer actions to actionPool
     */
    each(reduxActionsKeys, actionName => {
        thunkActions[actionName] = (...payload) => ({ type: actionName, payload })
    })

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

      if (options.bindAll === true || (args.length === 1 && args[0] === true)){
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

        return {
            api: apiMethod,
            ...reduxState,
        }
    }

    hookFunction.reduxers = initialReduxers

    return hookFunction
}

export default builder
