import React from "react"

import store from "./createStore"

import { Provider } from "react-redux"

import PropTypes from "prop-types"

import ReactizyProvider from "./Provider"

const Store = props => {
    let hocs = []
    let reduxers = []
    if (props.hocs !== undefined && props.hocs.length > 0) {
        reduxers = [...props.hocs[0].reduxers]

        if (props.hocs[props.hocs.length - 1] === true) {
            reduxers.push(true)
        }
    }

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
    hocs: PropTypes.array,
    apis: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default Store
