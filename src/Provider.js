import React from "react"

import Context from "./Context"

export default props => <Context.Provider value={props.value}>{props.children}</Context.Provider>
