import React from "react"

import Context from "./AsyncContext"

import PropTypes from "prop-types"

const Provider = props => <Context.Provider value={props.value}>{props.children}</Context.Provider>

Provider.propTypes = {
    value: PropTypes.array,
    children: PropTypes.array
}

export default Provider
