import React from "react"
import { Store } from "./core/index"
import hook from "./hooks/useReactizy"
import Screen from "./containers/Screen"
import "./styles/App.scss"

const App = () => {
    return (
        <Store pool={[hook, true]}>
            <Screen />
        </Store>
    )
}

export default App
