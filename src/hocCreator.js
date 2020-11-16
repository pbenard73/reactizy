import React from "react"

const hocCreator = (methodName, method) => {
    const hoc = Component => {
        const NewComponent = props => <Component {...{ [`${methodName}`]: method }} {...props} />

        return NewComponent
    }

    return hoc
}

export default hocCreator
