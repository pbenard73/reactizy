import React from "react"

import Code from "./../components/Code"

import apiIndex from "./code/Api_Index"
import apiPoolOne from './code/Api_Pool'
import apiPoolTwo from './code/Api_Ext'
import apiUsage from './code/Api_Usage'
import apiMethods from './code/Api_Methods'

export default () => (
    <section name='api' className='api'>
        <h1>Api</h1>
        <h2>Introduction</h2>
        <p>The <b>Api</b> permits to easily call Api routes, in using the `Axios` node package</p>

        <h2>Registration</h2>
        <p>First, create the api routes objects</p>

        <Code>{apiPoolOne}</Code>
        <Code>{apiPoolTwo}</Code>

        <p>After, register it into your hoc</p>
        <p><i>You can use the <code>domainize</code> utility to set a custom domain for an api pool</i></p>

        <Code>{apiIndex}</Code>

        <h3>Usage</h3>
        <Code>{apiUsage}</Code>

        <h3>Methods</h3>

        <Code>{apiMethods}</Code>
    </section>
)
