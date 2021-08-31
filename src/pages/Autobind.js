import React from "react"

import Code from "./../components/Code"

import mainCode from "./code/Autobind_Code"

const Autobind = () => (
    <section name='autobind' className='autobind'>
        <h1>Autobind</h1>
        <h2>Introduction</h2>
        <p>
            <b>Autobind</b> is a feature for <i>lazy</i> developpers 😋, to avoid the <code>method.bind(this)</code>{" "}
            declaration in the component constructor.
        </p>

        <h2>Usage</h2>
        <Code>{mainCode}</Code>
    </section>
)

export default Autobind
