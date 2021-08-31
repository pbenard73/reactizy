import React from "react"

import store from "./createStore"

import { Provider } from "react-redux"

import PropTypes from "prop-types"

const Store = props => {
    let hocs = []
    let reduxers = []

    if (props.pool !== undefined && props.pool.length > 0) {
        reduxers = [...props.pool[0].reduxers]

        if (props.pool[props.pool.length - 1] === true) {
            reduxers.push(true)
        }
    }

    return <Provider store={store(...reduxers)}>{props.children}</Provider>
}

Store.displayName = 'Reactizy_Store'

Store.propTypes = {
    pool: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default Store
