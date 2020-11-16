import React from "react"
import withReactizy from "./../src/highOrderComponent"
import hocBuilder from "./../src/hocBuilder"

import { render, act } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Store from "./../src/Store"

const Component = props => <div></div>

class ThunkedCompo extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    componentDidMount() {
        act(() => {
            this.props.call("thunkFirstname", "my new first name")
            this.props.api.call("main")
            this.props.api.call("wrongRoute")
        })
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <div>{this.props.name}</div>
                <div>{this.props.firstname}</div>
                <div>{this.props.age}</div>
            </div>
        )
    }
}

class Compo extends React.Component {
    componentDidMount() {
        act(() => {
            this.props.call("setNewName", "my new name")
        })
    }
    render() {
        return (
            <div>
                <div>{this.props.name}</div>
                <div>{this.props.firstname}</div>
            </div>
        )
    }
}

Compo.reduxers = ["notValid"]

class Full extends React.Component {
    componentDidMount() {
        act(() => {
            this.props.call("setName", "my new name")
        })
    }

    render() {
        return <div>{this.props.name}</div>
    }
}

const Sub = new (class {
    state = { subject: "mySubject" }
    reduxers = ["name"]

    renderSubject() {
        return <span>{this.state.subject}</span>
    }
})()

const api = {
    main: { path: "/" },
}

test("Hoc should trigger thunks", () => {
    const hoc = hocBuilder(
        {
            alert: () => {},
        },
        {},
        {
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
        }
    )

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

    const Simple = hoc([], ["age", "name", "firstname"], ["thunkFirstname"])(ThunkedCompo)
    expect(typeof Simple).toBe("object")

    const { container } = render(
        <Store reduxers={[reduxer, true]} apis={[api]}>
            <Simple />
        </Store>
    )

    console.log(container.innerHTML)
    expect(container).toHaveTextContent("my second name")
    expect(container).toHaveTextContent("my new first name")
    expect(container).toHaveTextContent("456123")
})

test("Hoc should return a function", () => {
    const Simple = withReactizy(Component)
    expect(typeof Simple).toBe("object")

    const Fus = withReactizy(Compo, Sub)
    expect(typeof Fus).toBe("object")

    const reduxer = new (class {
        state = {
            name: "myName",
        }

        actions = {
            setNameAsync: (...args) =>
                new Promise((resolve, reject) => {
                    resolve({ name: "newName" })
                }),
            setNewName: (state, name) => {
                return { ...state, name }
            },
        }
    })()

    const { container } = render(
        <Store reduxers={[reduxer, true]}>
            <Fus />
            <Component />
        </Store>
    )

    expect(container).toHaveTextContent("my new name")

    const { container: containerBis } = render(
        <Store reduxers={[reduxer]} apis={[api]}>
            <Fus />
            <Component />
        </Store>
    )
    expect(containerBis).toHaveTextContent("my new name")

    const FusFull = withReactizy(Full, Sub)

    const { container: containerTer } = render(
        <Store reduxers={[reduxer]} apis={[api]}>
            <FusFull />
        </Store>
    )

    setTimeout(() => {
        expect(containerTer).toHaveTextContent("my new name")
    }, 1000)
})
