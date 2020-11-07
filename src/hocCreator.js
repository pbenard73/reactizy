import React from 'react'

export default (methodName, method) => Component => props => <Component {...{[`${methodName}BindThis`]: method}} {...props} />
