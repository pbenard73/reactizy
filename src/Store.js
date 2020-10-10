import React from "react"

import store from "./createStore"

import { Provider } from "react-redux"

import PropTypes from "prop-types"

import ReactizyProvider from "./Provider"
import AsyncProvider from "./AsyncProvider"
import reduxer from "./reduxer"

const Store = props => {
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

Store.propTypes = {
    reduxers: PropTypes.array,
    apis: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default Store
