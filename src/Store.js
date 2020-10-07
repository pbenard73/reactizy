import React from "react"

import store from "./store"

import { Provider } from "react-redux"

import ReactizyProvider from "./Provider"
import AsyncProvider from "./AsyncProvider"
import reduxer from "./reduxer"

export default props => {
    const extra = reduxer(...props.reduxers, true)

    if (props.apis === undefined) {
        return (
            <Provider store={store(...props.reduxers)}>
                <AsyncProvider value={extra}>{props.children}</AsyncProvider>
            </Provider>
        )
    }

    return (
        <Provider store={store(...props.reduxers)}>
            <ReactizyProvider apis={props.apis}>
                <AsyncProvider value={extra}>{props.children}</AsyncProvider>
            </ReactizyProvider>
        </Provider>
    )
}
