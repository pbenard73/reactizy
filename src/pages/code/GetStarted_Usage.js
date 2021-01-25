export default `import React from "react";
import Hoc from "./hocs/Hoc";

class MyComponent extends React.Component {
    askLoginBindThis(username) {
        this.props.login({name: window.prompt('Username')})
        setTimeout(() => this.props.sayHello(this.props.user), 1000)
    }

    performLogoutBindThis() {
        this.props.logout()
        this.props.alert.info('Logout')
    }

    asyncLoginBindThis() {
        this.props.call('complexLogin', {user: window.prompt('New Username')})
    }

    addReceipesBindThis() {
        this.props.addToCook(5)
    }

    callApiBindThis() {
        this.props.api.call('mainRoute')
        .then(data => this.props.alert.success('Success'))
        .catch(error => this.props.alert.error('Error occured'))
    }

    render {
        return (
            <div className="App">
                {this.props.user === null ? (
                    <>
                        <button onClick={this.askLogin}>Login</button>
                        <button onClick={this.asyncLogin}>Login</button>
                    </>
                ) : (
                    <button onClick={this.performLogout}>Logout</button>
                )}

                <button onClick={this.callApi}>Call Api</button>

                <p> There are {this.props.receipeToCook} receipes </p>

                <button onClick={this.addReceipes}>Add receipes</button>
            </div>
        )
    }
}     

const uses = ['alert', 'sayHello']
const state = ['user', 'receipeToCook']
const actions = ['login', 'logout', 'addToCook', 'complexLogin'] 

export default Hoc(...uses, ...state, ...actions)(App)`
