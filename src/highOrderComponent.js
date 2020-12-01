import React from "react"

import { connect } from "react-redux"

import each from "./each"
import autobind from "./autobind"
import Context from "./Context"
import Api from "./Api"

export default function withReactify(WrappedComponent, ...parts) {
    let isClass =
        WrappedComponent.prototype !== undefined &&
        WrappedComponent.prototype.__proto__ !== undefined &&
        WrappedComponent.prototype.__proto__.isReactComponent !== undefined

    if (isClass === false) {
        isClass = WrappedComponent.toString().indexOf("class") === 0
    }

    const wrappedProto =
        WrappedComponent.prototype === undefined ? [] : Object.getOwnPropertyNames(WrappedComponent.prototype)

    const baseProperties = Object.getOwnPropertyNames(WrappedComponent)
        .concat(Object.getOwnPropertyNames(WrappedComponent.__proto__))
        .concat(wrappedProto)

    let staticState = WrappedComponent.reduxers
    let staticThunks = WrappedComponent.thunks !== undefined ? WrappedComponent.thunks : {}
    let thunkOptions = WrappedComponent.thunkOptions !== undefined ? WrappedComponent.thunkOptions : { name: "call", api: "true" }
    const useApi = WrappedComponent.useApi === false ? false : thunkOptions.api !== false 

    const isArray = item => [null, undefined].indexOf(item) === -1 && item.constructor.name.toLowerCase() === "array"

    staticState = isArray(staticState) === false || staticState.length === 0 ? [] : staticState

    let wantedStateProperties = isArray(staticState) === false ? [] : staticState

    let newState = {}
    let newMethods = {}

    /**
     * Extract all 'Fusion' parts :
     * Save state, methods and reduxers
     */
    each(parts, part => {
        if (part.reduxers !== undefined) {
            let partialPool = part.reduxers
            partialPool =
                partialPool === undefined ? [] : partialPool.filter(item => wantedStateProperties.indexOf(item) === -1)
            wantedStateProperties = [...wantedStateProperties, ...partialPool]
        }

        if (isClass === true) {
            const properties = Object.getOwnPropertyNames(part).concat(Object.getOwnPropertyNames(part.__proto__))

            each(properties, property => {
                if (["constructor", "reduxers"].indexOf(property) !== -1) {
                    return
                }

                if (property === "state") {
                    newState = { ...newState, ...part.state }

                    return
                }

                newMethods[property] = part[property]
            })
        }
    })

    let myComponent = WrappedComponent

    /**
     * Merge 'Fusion' parts if current Component is a class
     */
    if (isClass === true) {
        myComponent = class Extended extends WrappedComponent {
            constructor(props) {
                super(props)
                this.state = this.state === undefined ? newState : { ...this.state, ...newState }

                each(Object.keys(newMethods), methodName => {
                    this[methodName] = newMethods[methodName]
                })

                autobind.call(this, baseProperties)

                if (this.afterBind !== undefined && typeof this.afterBind === "function") {
                    this.afterBind()
                }
            }
        }
    }

    /**
     * Perform redux state to props
     */
    const mapStateToProps = state => {
        let properties = {}

        each(wantedStateProperties, property => {
            properties[property] = state[property]
        })

        return properties
    }


    /**
     * Affect redux actions and thunks to props
     */
    let mapActionsToProps = { ...staticThunks }

    const callDispatch = (type, ...args) => {
        if (staticThunks[type] === undefined) {
            return { type, payload: args[0] !== undefined ? args[0] : {} }
        }

        return staticThunks[type](...args)
    }

    mapActionsToProps[thunkOptions.name] = callDispatch

    /**
     * Connect component with redux
     */
    let Component = connect(mapStateToProps, mapActionsToProps)(myComponent)

    if (useApi === false) {
        return Component
    }

    /**
     * Apply the api behaviour
     */
    const apiFunctions = (context, url = false) => {
        return (routeName, ...args) => {
            let route = context.api[routeName]

            if (route === undefined) {
                return new Error(`Api route ${routeName} is not registered`)
            }

            return url === false ? Api.call(route, ...args) : Api.url(route, ...args)
        }
    }

    const MyHoc = () => {
        const HOC = (props, forwardedRef) => (
            <Context.Consumer>
                {value => {
                    let apiProps = {}
                    if ([null, undefined].indexOf(value) === -1 && value.api.length !== 0) {
                        apiProps = {
                            api: {
                                call: apiFunctions(value),
                                url: apiFunctions(value, true),
                            },
                        }
                    }

                    return <Component {...props} {...apiProps} ref={forwardedRef} />
                }}
            </Context.Consumer>
        )

        return React.forwardRef(HOC)
    }

    return MyHoc(Component)
}
