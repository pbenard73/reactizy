import React from "react"

import Code from "./../components/Code"
import { Link } from "react-router-dom"
import reduxerOne from "./code/GetStarted_ReduxOne"
import reduxerTwo from "./code/GetStarted_ReduxTwo"
import storeCreation from "./code/GetStarted_Store"
import usage from "./code/GetStarted_Usage"
import staty from "./code/Redux_Staty"

const Redux = () => (
    <section name='get started' className='get_started'>
        <h1>Redux and Reduxers</h1>
        <h2>Reduxers Creation</h2>

        <h3>Introduction</h3>
        <p>
            Each reducer is composed by an state object that will be merged into a global state object, and an actions that
            references all the methods. The method$aposs name is the key, the method is the value.
        </p>

        <p>
            For the asynchronous methods, refer to the <Link to='/hoc-builder'>Hoc Builder</Link> documentation.
        </p>

        <h3>Usage</h3>
        <Code>{reduxerOne}</Code>
        <Code>{reduxerTwo}</Code>

        <h2>Store Creation</h2>

        <Code>{storeCreation}</Code>

        <h2>Usage in Components</h2>
        <Code>{usage}</Code>

        <h2>Tips</h2>

        <h3>staty</h3>
        <p>
            If some base state update must be triggered, you can use the <code>staty</code> function in order to simplify
            this actions{" "}
        </p>
        <Code>{staty}</Code>
    </section>
)

export default Redux
