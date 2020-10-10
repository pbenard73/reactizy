import React from "react"
import each from "./each"
import Context from "./Context"
import PropTypes from "prop-types"

const Provider = props => {
    let api = {}

    each(props.apis !== undefined ? props.apis : [], apiPool => {
        api = {...api, ...apiPool}
    })

    return <Context.Provider value={{api}}>{props.children}</Context.Provider>
}

Provider.propTypes = {
    apis: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default Provider

