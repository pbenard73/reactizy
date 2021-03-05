import React, { useState } from "react"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

import { Route, Switch } from "react-router-dom"

import Home from "./pages/Home"
import Api from "./pages/Api"
import Combined from "./pages/Combined"
import GetStarted from "./pages/GetStarted"
import HocBuilder from "./pages/HocBuilder"
import Redux from "./pages/Redux"
import Autobind from "./pages/Autobind"
import Splitter from "./pages/Splitter"

import "./styles/App.scss"

const map = [
    ["/api", Api],
    ["/hoc-builder", HocBuilder],
    ["/get-started", GetStarted],
    ["/redux-and-reduxers", Redux],
    ["/splitter", Splitter],
    ["/autobind", Autobind],
    ["/combined-reduxers", Combined]
]

const App = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className='App'>
            <Header toggleMenu={() => setOpen(!open)} />
            <div className='wrapper'>
                <Sidebar open={open} closeMenu={() => setOpen(false)}/>
                <div className='content'>
                    <Switch>
                        {map.map(item => (
                            <Route path={item[0]} component={item[1]} />
                        ))}
                        <Route component={Home} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default App
