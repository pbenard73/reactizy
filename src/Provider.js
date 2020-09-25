import React from "react"
import each from './each'
import Context from "./Context"

export default props => {
    let api = {}

    each(props.apis !== undefined ? props.apis : [], apiPool => {
        api = {...api, ...apiPool}
    })

    const hocs = props.value !== undefined ? props.value : {}
    
    const value = {hocs, api}

    return <Context.Provider value={value}>{props.children}</Context.Provider>
}

