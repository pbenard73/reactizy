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
            this.props.call("thunkFirstname", "my new first name")
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
            this.props.call("thunkFirstname", "my new first name")
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

const fusion = {
    hocs: ['alert'],
        component: () => new (class{
    })
}

const api = {
    main: { path: "/" },
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


    const Simple = hoc([], ["age", "name", "firstname"], ["thunkFirstname"])(ThunkedCompo)
    expect(typeof Simple).toBe("object")

    let { container } = render(
        <Store hocs={[hoc, true]} apis={[api]}>
            <Simple />
        </Store>
    )

    expect(container).toHaveTextContent("my second name")
    expect(container).toHaveTextContent("my new first name")
    expect(container).toHaveTextContent("456123")

    const Double = hoc(["age", "name", "firstname"], true)(ThunkedCompo)
    expect(typeof Double).toBe("object")

    let { container:doubleContainer } = render(
        <Store hocs={[hoc, true]} apis={[api]}>
            <Double />
        </Store>
    )

    expect(doubleContainer).toHaveTextContent("my second name")
    expect(doubleContainer).toHaveTextContent("my new first name")
    expect(doubleContainer).toHaveTextContent("456123")

    const Triple = hoc(true)(ThunkedCompo)
    expect(typeof Triple).toBe("object")

    let { container:tripleContainer } = render(
        <Store hocs={[hoc, true]} apis={[api]}>
            <Triple />
        </Store>
    )

    const Quatro = hoc([], true)(ThunkedCompo)
    expect(typeof Quatro).toBe("object")

    let { container:quatroContainer } = render(
        <Store hocs={[hoc, true]} apis={[api]}>
            <Quatro />
        </Store>
    )

    const Cinquo = hoc(['thunkFirstname'])(ThunkedCompo)
    expect(typeof Cinquo).toBe("object")

    let { container:cinquoContainer } = render(
        <Store hocs={[hoc, true]} apis={[api]}>
            <Cinquo />
        </Store>
    )

    const Sexo = hoc(['alert', 'customize'], ['thunkFirstname'])(ThunkedCompo)
    expect(typeof Sexo).toBe("function")

    let { container:sexoContainer } = render(
        <Store hocs={[hoc, true]} apis={[api]}>
            <Sexo />
        </Store>
    )

    const Setto = fushoc(['alert', 'customize', 'invalid'], ['thunkFirstname'])(ThunkedCompo)
    expect(typeof Setto).toBe("function")

    let { container:settoContainer } = render(
        <Store hocs={[fushoc, true]} apis={[api]}>
            <Setto />
        </Store>
    )

    const Otto = fushoc()(ThunkedCompo)
    expect(typeof Otto).toBe("object")

    let { container:ottoContainer } = render(
        <Store hocs={[fushoc, true]} apis={[api]}>
            <Otto />
        </Store>
    )

    const Novo = fushoc()(false, ThunkedCompo)
    expect(typeof Novo).toBe("object")

    let { container:novoContainer } = render(
        <Store hocs={[fushoc, true]} apis={[api]}>
            <Novo />
        </Store>
    )

    const T10 = permhoc('alert', 'customize', 'invalid', 'thunkFirstname')(ThunkedCompo)
    expect(typeof T10).toBe("object")

    let { container:t10Container } = render(
        <Store hocs={[permhoc, true]} apis={[api]}>
            <T10 />
        </Store>
    )

    NoApiCompo.useApi = false
    const T11 = permhoc('thunkFirstname', 'name')(NoApiCompo)
    expect(typeof T11).toBe("object")

    let { container:t11Container } = render(
        <Store hocs={[permhoc]} apis={[api]}>
            <T11 />
        </Store>
    )
})
