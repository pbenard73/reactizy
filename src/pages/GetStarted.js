import React from "react"

import { Link } from "react-router-dom"

import Code from "./../components/Code"

import registerHoc from "./code/GetStarted_Hoc"
import reduxerOne from "./code/GetStarted_ReduxOne"
import reduxerTwo from "./code/GetStarted_ReduxTwo"
import apiPool from "./code/Api_Pool"
import index from "./code/GetStarted_Store"
import usage from "./code/GetStarted_Usage"

const url = "/hoc-builder"

const GetStarted = () => (
    <section name='get started' className='get_started'>
        <h1>Get Started</h1>

        <h2>Create your Reduxers</h2>

        <p>Register the reduxers you need to use</p>

        <Code>{reduxerOne}</Code>
        <Code>{reduxerTwo}</Code>

        <h2>Create your Api routing files</h2>

        <Code>{apiPool}</Code>

        <h2>Create your High Order Component</h2>

        <p>
            Register here your wanted HOC with their shortname. Be careful of unicity of the shortnames. It shouldn$apost be
            present in the reduxers pool and actions. <Link to={url}>Full details about the provided features</Link>
        </p>

        <p>
            Here is an example with <code>withRouter</code> from <code>react-router-dom</code> and <code>withAlert</code>{" "}
            from <code>react-alert</code> packages
        </p>

        <Code>{registerHoc}</Code>

        <h2>Implement your application</h2>

        <Code>{index}</Code>

        <p>
            If the last item of the <code>hocs</code> array is set to <code>true</code> then the redux developper tools will
            be instanciate (usefull in dev mode).
        </p>

        <h2>Use in Component</h2>

        <Code>{usage}</Code>
    </section>
)

export default GetStarted
