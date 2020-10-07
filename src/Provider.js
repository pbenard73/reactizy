import React from "react"
import each from './each'
import Context from "./Context"

export default props => {
    let api = {}

    each(props.apis !== undefined ? props.apis : [], apiPool => {
        api = {...api, ...apiPool}
    })

    return <Context.Provider value={{api}}>{props.children}</Context.Provider>
}

