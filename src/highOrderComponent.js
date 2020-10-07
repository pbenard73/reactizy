import React from "react"

import { connect } from "react-redux"

import each from "./each"
import autobind from "./autobind"
import AsyncContext from "./AsyncContext"
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

    const isArray = item =>
        [null, undefined].indexOf(item) === -1 && item.constructor.name.toLowerCase() === "array"

    staticState = isArray(staticState) === false || staticState.length === 0 ? [[], []] : staticState

    let pooler = {
        wantedStateProperties: isArray(staticState[0]) === false ? [] : staticState[0],
        wantedActions: staticState.length > 1 && isArray(staticState[1]) === true ? staticState[1] : [],
    }

    let newState = {}
    let newMethods = {}

    each(parts, part => {
        if (part.reduxers !== undefined) {
            each(["wantedStateProperties", "wantedActions"], (pool, i) => {
                let partialPool = part.reduxers[i]
                partialPool = partialPool === undefined ? [] : partialPool.filter(item => pooler[pool].indexOf(item) === -1)
                pooler[pool] = [...pooler[pool], ...partialPool]
            })
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

    if (isClass === true) {
        myComponent = class Extended extends WrappedComponent {
            constructor(props) {
                super(props)
                this.state = this.state === undefined ? newState : { ...this.state, ...newState }

                each(Object.keys(newMethods), methodName => {
                    this[methodName] = newMethods[methodName]
                })

                autobind.call(this, baseProperties)
            }
        }
    }

    const mapStateToProps = state => {
        let properties = {}

        each(pooler.wantedStateProperties, property => {
            properties[property] = state[property]
        })

        return properties
    }

    const mapActionsToProps = {}
    const suffix = "Async"

    each(pooler.wantedActions, action => {
        const index = action.indexOf(suffix)
        let name = index < 1 ? action : `${action}_inner_redux`

        mapActionsToProps[name] = payload => {
            return { type: action, payload }
        }
    })

    const MyAsyncHoc = GivenComponent => {
        return class MyHoc extends React.Component {
            constructor(props) {
                super(props)
            }

            render() {
                return (
                    <AsyncContext.Consumer>
                        {value => {
                            let data = {}

                            each(Object.keys(value), actionName => {
                                if (pooler.wantedActions.indexOf(actionName) === -1) {
                                    return
                                }

                                data[actionName] = (...args) =>
                                    new Promise((resolve, reject) => {
                                        value[actionName](...args)
                                            .then(payload => {
                                                const type = `${actionName}_inner_redux`

                                                this.props[type](payload)

                                                resolve(true)
                                            })
                                            .catch(error => reject(error))
                                    })
                            })

                            return <GivenComponent {...this.props} {...data} />
                        }}
                    </AsyncContext.Consumer>
                )
            }
        }
    }

    let Component = MyAsyncHoc(myComponent)

    Component = connect(mapStateToProps, mapActionsToProps)(Component)

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
