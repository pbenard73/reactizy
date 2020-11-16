import each from "./each"

export default function (...reduxers) {
    let initialState = {}

    let actionsPool = {}

    let asyncs = {}

    each(reduxers, reducer => {
        if (reducer.state !== undefined) {
            initialState = { ...initialState, ...reducer.state }
        }

        if (reducer.actions !== undefined) {
            actionsPool = { ...actionsPool, ...reducer.actions }
        }
    })

    if (reduxers[reduxers.length - 1] === true) {
        return {actions: asyncs}
    }

    return (state = initialState, action) => {
        const registeredAction = actionsPool[action.type]

        return registeredAction === undefined ? { ...state } : registeredAction(state, action.payload)
    }
}
