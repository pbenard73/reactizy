import each from "./each"

export default function (...reduxers) {
    let initialState = {}

    let actionsPool = {}

    const asyncSuffix = "Async"
    let asyncs = {}

    each(reduxers, reducer => {
        if (reducer.state !== undefined) {
            initialState = { ...initialState, ...reducer.state }
        }

        let actions = {}

        if (reducer.actions !== undefined) {
            each(Object.keys(reducer.actions), name => {
                let index = name.indexOf(asyncSuffix)

                let isSync = index < 1 || index !== name.length - asyncSuffix.length

                if (isSync === false) {
                    asyncs[name] = reducer.actions[name]
                    actions[name] = (state, payload) => {
                        payload = [null, undefined].indexOf(payload) === -1 || typeof payload !== "object" ? {} : payload

                        return { ...state, ...payload }
                    }
                } else {
                    actions[name] = reducer.actions[name]
                }
            })

            actionsPool = { ...actionsPool, ...actions }
        }
    })

    if (reduxers[reduxers.length - 1] === true) {
        return asyncs
    }

    return (state = initialState, action) => {
        const registeredAction = actionsPool[action.type]

        return registeredAction === undefined ? { ...state } : registeredAction(state, action.payload)
    }
}
