import React from "react"

import store from "./store"

import { Provider } from "react-redux"

export default props => <Provider store={store(...props.reduxers)}>{props.children}</Provider>

