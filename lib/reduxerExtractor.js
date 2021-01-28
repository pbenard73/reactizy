import each from "./each"

export default function (...reduxers) {
    let initialState = []

    let actionsPool = []

    each(reduxers, reducer => {
        if (reducer.state !== undefined) {
            initialState = [ ...initialState, ...Object.keys(reducer.state)]
        }

        if (reducer.actions !== undefined) {
            actionsPool = [ ...actionsPool, ...Object.keys(reducer.actions)]
        }
    })

    return {
        state: initialState,
        actions: actionsPool
    }
}
