import Api from "./Api"
import each from "./each"
import reduxerExtractor from "./reduxerExtractor"

const baseBuilder = {
    getCombinedReducers: initialReduxers => {
        let combined = {}
        let combinedNames = []

        each(initialReduxers, reducer => {
            if (reducer.isCombined !== true || reducer.name === undefined) {
                return
            }

            combinedNames.push(reducer.name)

            combined[reducer.name] = reducer.actions
        })

        return [combined, combinedNames]
    },
    performApi: givenApis => {
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

        const apiHoc = Component => props => <Component {...props} api={{ call: apiFunctions(), url: apiFunctions(true) }} />

        return [hasApi, apiFunctions, apiHoc]
    },
    getReduxerData: initialReduxers => {
        const { state, actions, thunks, combinedActions, combinedThunks, commons } = reduxerExtractor(...initialReduxers)
        return [state, actions, thunks, combinedActions, combinedThunks, commons]
    },
    getReduxCombinedThunks: (givenReduxCombinedThunks, performDispatch, defaultCallerName) => {
        let reduxCombinedThunks = {}

        each(Object.keys(givenReduxCombinedThunks), combineName => {
            reduxCombinedThunks[combineName] = {}
            const combineThunks = givenReduxCombinedThunks[combineName]
            each(Object.keys(combineThunks), thunk => {
                reduxCombinedThunks[combineName][`${combineName}.${thunk}`] = (...args) => (dispatch, getState) =>
                    combineThunks[thunk]((name, ...args) => performDispatch(dispatch, name)(...args), getState, ...args)
            })
        })

        return reduxCombinedThunks
    },
    getThunksActions: (thunkPool, performDispatch, reduxActionsKeys, callerName) => {
        let thunkActions = {}
        /**
         * Attach reducer thunk actions For functionnal Component
         * or Hoc thunks for Hoc
         */
        each(Object.keys(thunkPool), thunkName => {
            thunkActions[thunkName] = (...args) => (dispatch, getState) =>
                thunkPool[thunkName]((name, ...args) => performDispatch(dispatch, name)(...args), getState, ...args)
        })

        /**
         * Attach generic thunk caller
         */
        thunkActions[callerName] = (name, ...args) => (dispatch, getState) => performDispatch(dispatch, name)(...args)

        /**
         * Attach reduxer actions to actionPool
         */
        each(reduxActionsKeys, actionName => {
            thunkActions[actionName] = (...payload) => ({ type: actionName, payload })
        })

        return thunkActions
    },
}

export default baseBuilder
