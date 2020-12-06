import React from "react"
import withReactizy from "./../src/highOrderComponent"
import hocBuilder from "./../src/hocBuilder"

import { render, act } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Store from "./../src/Store"

const Component = props => <div></div>

class NoApiCompo extends React.Component {
    constructor(props) {
        super(props)
    }

    afterBind() {}

    componentDidMount() {
        act(() => {
 //           this.props.thunkFirstname("my new first name")
        })
    }
    render() {
        return (
            <div>
                <div>{this.props.name}</div>
                <div>{this.props.firstname}</div>
                <div>{this.props.age}</div>
            </div>
        )
    }
}

class ThunkedCompo extends React.Component {
    constructor(props) {
        super(props)
    }

    afterBind() {}

    componentDidMount() {
        act(() => {
            this.props.thunkFirstname("my new first name")
            this.props.api.call("main")
            this.props.api.call("wrongRoute")
        })
    }
    render() {
        return (
            <div>
                <div>{this.props.name}</div>
                <div>{this.props.firstname}</div>
                <div>{this.props.age}</div>
            </div>
        )
    }
}

const api = {
    main: { path: "/" },
}

const fusion = {
    hocs: ['alert'],
    component: () => {}
}

test("Hoc should trigger thunks", () => {
    const reduxer = new (class {
        state = {
            name: "myName",
            firstname: "myFirstname",
            age: "0",
        }

        actions = {
            setAge: (state, age) => ({ ...state, age }),
            setName: (state, name) => {
                return { ...state, name }
            },
            setFirstname: (state, firstname) => {
                return { ...state, firstname }
            },
        }
    })()

    const permhoc = hocBuilder({
        apis:[api],
        reduxers: [reduxer],
        hocs: {
            alert: Component => Component,
        },
        thunks: {
            thunkFirstname: function (firstname) {
                return (dispatch, getState, firstname) => {
                    dispatch("setFirstname", firstname)
                    dispatch("setName", "my second name")
                    dispatch("thunkAge", "456123")
                }
            },
            thunkAge: function (age) {
                return (dispatch, getState, age) => {
                    dispatch("setAge", age)
                }
            },
        },
        customs: {
            customize: function(test) {alert(test)}
        },
        options: {
            permissive: true
        }
    })

    const fushoc = hocBuilder({
        apis:[api],
        reduxers: [reduxer],
        hocs: {
            alert: Component => Component,
        },
        thunks: {
            thunkFirstname: function (firstname) {
                return (dispatch, getState, firstname) => {
                    dispatch("setFirstname", firstname)
                    dispatch("setName", "my second name")
                    dispatch("thunkAge", "456123")
                }
            },
            thunkAge: function (age) {
                return (dispatch, getState, age) => {
                    dispatch("setAge", age)
                }
            },
        },
        customs: {
            customize: function(test) {alert(test)}
        }
    })
    const hoc = hocBuilder({
        apis:[api],
        reduxers: [reduxer],
        hocs: {
            alert: Component => Component,
        },
        fusion:[fusion],
        thunks: {
            thunkFirstname: function (firstname) {
                return (dispatch, getState, firstname) => {
                    dispatch("setFirstname", firstname)
                    dispatch("setName", "my second name")
                    dispatch("thunkAge", "456123")
                }
            },
            thunkAge: function (age) {
                return (dispatch, getState, age) => {
                    dispatch("setAge", age)
                }
            },
        },
        customs: {
            customize: function(test) {alert(test)}
        }
    })


    const Simple = hoc("age", "name", "firstname", "thunkFirstname")(ThunkedCompo)
    expect(typeof Simple).toBe("function")

    let { container } = render(
        <Store hocs={[hoc, true]}>
            <Simple />
        </Store>
    )

    expect(container).toHaveTextContent("my second name")
    expect(container).toHaveTextContent("my new first name")
    expect(container).toHaveTextContent("456123")

    const Quatro = hoc()(NoApiCompo)
    expect(typeof Quatro).toBe("function")

    let { container:quatroContainer } = render(
        <Store hocs={[hoc, true]}>
            <Quatro />
        </Store>
    )
    const Setto = fushoc('alert', 'customize', 'invalid', 'thunkFirstname')(ThunkedCompo)
    expect(typeof Setto).toBe("function")

    let { container:settoContainer } = render(
        <Store hocs={[fushoc, true]}>
            <Setto />
        </Store>
    )

const Sub = new (class {
    state = { subject: "mySubject" }
    reduxers = ["name"]
    thunks= ['setNewName', 'setName']

    renderSubject() {
        return <span>{this.state.subject}</span>
    }
})()


    const Novo = fushoc()(false, NoApiCompo, Sub)
    expect(typeof Novo).toBe("function")

    let { container:novoContainer } = render(
        <Store hocs={[fushoc, true]}>
            <Novo />
        </Store>
    )
})
