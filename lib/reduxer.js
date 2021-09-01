import each from "./each"

export default function (...reduxers) {
    let initialState = {}
    let actionsPool = {}
    let combinedPool = {}
    let combined = {}

    each(reduxers, reducer => {
        if (reducer.isCombined === true && reducer.name !== undefined) {
            initialState[reducer.name] = reducer.state
            combined[reducer.name] = reducer

            combinedPool[reducer.name] = (state = initialState[reducer.name], action) => {
                const combinedAction = reducer.actions[action.type]

                return combinedAction === undefined ? { ...state } : combinedAction(state, ...action.payload)
            }
        }

        if (reducer.state !== undefined) {
            initialState = { ...initialState, ...reducer.state }
        }

        if (reducer.actions !== undefined) {
            actionsPool = { ...actionsPool, ...reducer.actions }
        }
    })

    return (state = initialState, action) => {
        const parts = action.type.split(".")
console.log('A', action)
        /**
         * It's not a combined action
         */
        if (parts.length < 2 || combinedPool[parts[0]] === undefined) {
            const registeredAction = actionsPool[action.type]


            return registeredAction === undefined ? { ...state } : registeredAction(state, ...action.payload)
        }

        /**
         * It's a combine action
         */
        const [combinedName, type] = parts
            console.log('B', action.type, action.payload);

        return {
            ...state,
            [combinedName]: combinedPool[combinedName](state[combinedName], { type, payload: action.payload }),
        }
    }
}
