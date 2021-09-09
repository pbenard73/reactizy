import { staty } from "./../core/index"

const mainReduxer = {
    state: {
        windows: {},
        active: null,
        order: [],
    },
    actions: {
        ...staty("windows", "order"),
        setInnerActive: (state, active) => {
            state.active = active
        },
    },
    thunks: {
        setActive: (dispatch, getState, uuid) => {
            let state = getState()
            const order = [...state.order]
            const actualIndex = order.indexOf(uuid)
            if (actualIndex !== -1) {
                order.splice(actualIndex, 1)
            }
            order.push(uuid)
            dispatch("setOrder", order)
            dispatch("setInnerActive", uuid)
        },
        addWindow: (dispatch, getState, windowData) => {
            let state = getState()
            let windows = { ...state.windows }
            const uuid = windowData.uuid

            if (windows[uuid] === undefined) {
                windows[uuid] = windowData
            } else {
                const order = [...state.order]
                const actualIndex = order.indexOf(uuid)
                order.splice(actualIndex, 1)
                order.push(uuid)
            }

            dispatch("setActive", uuid)
            dispatch("setWindows", windows)
        },
        removeWindow: (dispatch, getState, uuid) => {
            let state = getState()
            let windows = { ...state.windows }

            if (windows[uuid] !== undefined) {
                const order = [...state.order]
                const actualIndex = order.indexOf(uuid)
                order.splice(actualIndex, 1)
                dispatch("setOrder", order)
                windows[uuid] === undefined
                delete windows[uuid]
                dispatch("setWindows", windows)
                dispatch("setActive", order.length > 0 ? order[order.length - 1] : null)
            }
        },
    },
}

export default mainReduxer
