import React from "react"

const hocCreator = (methodName, method) => Component => props => <Component {...{ [`${methodName}`]: method }} {...props} />

export default hocCreator
