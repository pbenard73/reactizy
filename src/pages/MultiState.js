import React from "react"

import Code from "./../components/Code"

import mainCode from "./code/MultiState_Code"

const MultiState = () => (
    <section name='multistate' className='multistate'>
        <h1>Multi State Hook</h1>
        <h2>Introduction</h2>
        <p>
            <b>MultiState</b> is a hook permiting to declare in one shoot multiple state variables for functionnal component{" "}
            <code>{"const [foo, setFoo, bar, setBar] = useMultiState('foo', null)"}</code>.
        </p>

        <h2>Usage</h2>
        <p>Note that default values are required for each variable</p>
        <Code>{mainCode}</Code>
    </section>
)

export default MultiState
