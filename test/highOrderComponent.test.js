import React from "react"
import withReactizy from "./../src/highOrderComponent"

import { render, act } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Store from "./../src/Store"

const Component = props => <div></div>

class Compo extends React.Component {
    componentDidMount() {
        act(() => {
            this.props.setNewName('my new name')
        })
    }
    render() {
        return <div>{this.props.name}</div>
    }
}

Compo.reduxers = [[], ["notValid"]]

class Full extends React.Component {
    componentDidMount() {
        act(() => {
            this.props.setName("my new name")
        })
    }

    render() {
        return <div>{this.props.name}</div>
    }
}

const Sub = new (class {
    state = { subject: "mySubject" }
    reduxers = [["name"], ["setName", "setNewName", "notValidAction"]]

    renderSubject() {
        return <span>{this.state.subject}</span>
    }
})()

const api = {
    main: { path: "/" },
}

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
