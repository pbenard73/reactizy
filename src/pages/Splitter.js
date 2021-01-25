import React from 'react'

import Code from "./../components/Code"

import mainCode from './code/Splitter_Main'
import subCode from './code/Splitter_Sub'

export default () => (
    <section name='splitter' className='splitter'> 
        <h1>Splitter</h1>
        <h2>Introduction</h2>
        
        <p>The Splitter behaviour permits to merge many Classes to the current Component</p>
        <p>All the methods will be merged into the components.</p>

        <p>If a <code>state</code> object is defined, it will be merged into the state of the main component</p>

        <p>If a <code>hoc</code> array is provided, it will be merged inside the HOC arguments of the main Components</p>

        <h2>Usage</h2>
        
        <p>The following code result in a state corresponding to :</p>
        <p><code>{"state = {foo: 'bar', partCount: 0}"}</code></p>

        <p>And the export Hoc will correspond to : </p>
        <p><code>export default Hoc("user", "receipeToCook", "login", "decrement", "logout")(App, SubPage);</code></p>

        <p>All the parts methods will be merged inside the main component.</p>

        <hr />

        <Code>{subCode}</Code>
        <Code>{mainCode}</Code>
    </section>
)
