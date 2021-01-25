export default `/* src/App.js */

import React from "react";

import SubPage from './partials/SubPage'

import Hoc from "./hocs/Hoc";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = { foo: 'bar' }
    }

    render() {
        return (
            <div className="App">
                <p> There are {this.props.receipeToCook} receipes</p>
                {this.props.user === null ? (
                    <button onClick={this.props.login}>Login</button>
                ) : (
                    <p onClick={this.props.logout}>Logout</p>
                )}
                { this.renderSubArea()  }
            </div>
        )
    }
}

export default Hoc("user", "login")(App, SubPage);`
