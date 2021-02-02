import React from "react"
import { Link } from 'react-router-dom'
import Code from "./../components/Code"

import registerHoc from "./code/HocBuilder_Index"
import hocUsage from "./code/HocBuilder_Usage"

export default () => (
    <section name='hoc builder' className='hoc_builder'>
        <h1>Hoc Builder</h1>

        <p>
            The Hoc Builder permits to :
            <ul>
                <li>create the main High Order Component</li>
                <li>register the third part HOCs</li>
                <li>create your owns simple HOC</li>
                <li>link a splitted component to every React Component (they must be designed as class form)</li>
            </ul>
        </p>

        <h2>Create your High Order Component</h2>

        <Code>{registerHoc}</Code>

        <p>
            The HocBuilder takes as argument an object with following keys :
            <dl>
                <dt><b>apis</b></dt>
                <dd>array : an array of api pool</dd>
                <dt><b>reduxers</b></dt>
                <dd>array : an array of reduxers</dd>
                <dt><b>hocs</b></dt>
                <dd>object : the shortname as key and third HOC as value</dd>
                <dt><b>customs</b></dt>
                <dd>object : the shortname as key and function transformed as HOC as value</dd>
                <dt><b>thunks</b></dt>
                <dd>object : shortname as key and function transformed as redux-thunk thunks</dd>
                <dt><b>fusion</b></dt>
                <dd>array : An array representing all splitted that will be merge into each component implementing this current hoc.</dd>
                <dt><b>options</b></dt>
                <dd>object : options object to configure the HOC</dd>
            </dl>
        </p>

        <h3>Beware of reduxers</h3>

        <p>In order to retrieve all the states and reduxers actions, the first hocs you registered into the <code>Store</code> must be filled with the whole list of reduxers, those will serve to fill the redux store.</p>

        <h3>Thunks</h3>
        
        <p>All the thunks are functions, each arguments must be passes in the returning callback.</p>
        <p>In component, the call the the thunk is made vi <code>{"this.props.call('thunkShortname', ...args)"}</code></p>
        <p>If the options <code>{"{name: 'dispatch'}"}</code> for exemple is given then the call will be <code>{"this.props.dispatch('thunkShortname', ...args)"}</code></p>

        <h3>Fusion</h3>

        <p>Fusion is an array of piece of component that will be merge in every class Component using the HOC</p>
        <p>The <code>component</code> key, is a function returning a <Link to="/splitter">Splitted class</Link></p>
        <p>The <code>uses</code>, <code>state</code>, <code>actions</code>, are partials HOC arguments that will be passed in complement of main Component arguments.</p>

        <h3>Options</h3>

        <p>Actually the options takes the <code>name</code> key representing the property name to call the thunks actions and generic redux actions.</p>
	<p>The <code>bindAll</code> (boolean) binds every thing to every components</p>
	<p>The <code>pure</code> (string) is the hoc method to simply connect to the redux store</p>

        <h2>Usage in component</h2>

        <Code>{hocUsage}</Code>
    </section>
)
