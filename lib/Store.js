import React from "react"

import store from "./createStore"

import { Provider } from "react-redux"

import PropTypes from "prop-types"

const Store = props => {
    let hocs = []
    let reduxers = []

    if (props.hocs !== undefined && props.hocs.length > 0) {
        reduxers = [...props.hocs[0].reduxers]

        if (props.hocs[props.hocs.length - 1] === true) {
            reduxers.push(true)
        }
    }
console.log("REDU", reduxers, ...reduxers)
    return <Provider store={store(...reduxers)}>{props.children}</Provider>
}

Store.displayName = 'Reactizy_Store'

Store.propTypes = {
    hocs: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default Store
