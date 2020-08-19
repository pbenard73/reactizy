import React from "react"

import store from "./store"

import { Provider } from "react-redux"

import ReactizyProvider from "./Provider"

export default props => {
    if (props.uses === undefined) {
        return <Provider store={store(...props.reduxers)}>{props.children}</Provider>
    }

    return (
        <Provider store={store(...props.reduxers)}>
            <ReactizyProvider value={props.uses}>{props.children}</ReactizyProvider>
        </Provider>
    )
}
