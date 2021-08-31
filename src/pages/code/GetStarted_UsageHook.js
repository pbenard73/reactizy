export default `import React from "react";
import useReactizy from "./hooks/useReactizy";

const MyComponent = () => {
    const _ = useReactizy('login', 'logout', 'user')

    const askLogin = (username) => {
        _.login({name: window.prompt('Username')})
        setTimeout(() => alert(_.user), 1000)
    }

    const performLogout = () => {
        _.logout()
    }

    const addReceipes = () => {
        _.addToCook(5)
    }

    const callApi = () => {
        _.api.call('mainRoute')
        .then(() => {})
        .catch(e => {})
    }

    return (
        <div className="App">
            {_.user === null ? (
                <button onClick={askLogin}>Login</button>
            ) : (
                <button onClick={performLogout}>Logout</button>
            )}

            <button onClick={callApi}>Call Api</button>

            <p> There are {_.receipeToCook} receipes </p>

            <button onClick={addReceipes}>Add receipes</button>
        </div>
    )
}     

export default MyComponent`
