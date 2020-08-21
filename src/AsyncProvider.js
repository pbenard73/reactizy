import React from "react"

import Context from "./AsyncContext"

import each from "./each"

import { connect } from "react-redux"

export default props => <Context.Provider value={props.value}>{props.children}</Context.Provider>
