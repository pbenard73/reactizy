import each from "./each"

export default function (...reduxers) {
    let initialState = []
    let actionsPool = []
    let combinedActions = {}
    let combinedThunks = {}

    each(reduxers, reducer => {
        if (reducer.isCombined === true && reducer.name !== undefined) {
            combinedActions[reducer.name] = {}

            each(Object.keys(reducer.actions || {}), actionName => {
                const newActionName = `${reducer.name}.${actionName}`

                combinedActions[reducer.name][newActionName] = payload => ({
                    type: `${reducer.name}.${actionName}`,
                    payload,
                })
            })

            combinedThunks[reducer.name] = { ...(reducer.thunks || {}) }

            return
        }

        if (reducer.state !== undefined) {
            initialState = [...initialState, ...Object.keys(reducer.state)]
        }

        if (reducer.actions !== undefined) {
            actionsPool = [...actionsPool, ...Object.keys(reducer.actions)]
        }
    })

    return {
        state: initialState,
        actions: actionsPool,
        combinedActions,
        combinedThunks,
    }
}
