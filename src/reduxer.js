import each from "./each"

export default function (...reduxers) {
    let initialState = {}

    let actionsPool = {}

    each(reduxers, reducer => {
        if (reducer.state !== undefined) {
            initialState = { ...initialState, ...reducer.state }
        }

        if (reducer.actions !== undefined) {
            actionsPool = { ...actionsPool, ...reducer.actions }
        }
    })

    return (state = initialState, action) => {
        const registeredAction = actionsPool[action.type]

        return registeredAction === undefined ? { ...state } : registeredAction(state, action.payload)
    }
}
