import React from "react"

import Code from "./../components/Code"
import registerHook from "./code/GetStarted_Hook"
import reduxerOne from "./code/GetStarted_ReduxOne"
import reduxerTwo from "./code/GetStarted_ReduxTwo"
import apiPool from "./code/Api_Pool"
import index from "./code/GetStarted_StoreHook"
import usage from "./code/GetStarted_UsageHook"

const GetStarted = () => (
    <section name='get started hook' className='get_started_hook'>
        <h1>Get Started</h1>

        <h2>Create your Reduxers</h2>

        <p>Register the reduxers you need to use</p>

        <Code>{reduxerOne}</Code>
        <Code>{reduxerTwo}</Code>

        <h2>Create your Api routing files</h2>

        <Code>{apiPool}</Code>

        <h2>Create your Hook</h2>

        <Code>{registerHook}</Code>

        <h2>Implement your application</h2>

        <Code>{index}</Code>

        <p>
            If the last item of the <code>pool</code> array is set to <code>true</code> then the redux developper tools will
            be instanciate (usefull in dev mode).
        </p>

        <h2>Use in Component</h2>

        <Code>{usage}</Code>
    </section>
)

export default GetStarted
