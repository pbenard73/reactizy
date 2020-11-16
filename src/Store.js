import React from "react"

import store from "./createStore"

import { Provider } from "react-redux"

import PropTypes from "prop-types"

import ReactizyProvider from "./Provider"
import reduxer from "./reduxer"

const Store = props => {
    let reduxers = [...props.reduxers]

    const extra = reduxer(...reduxers, true)

    if (props.apis === undefined) {
        return (
            <Provider store={store(...reduxers)}>
                {props.children}
            </Provider>
        )
    }

    return (
        <Provider store={store(...reduxers)}>
            <ReactizyProvider apis={props.apis}>
                {props.children}
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
