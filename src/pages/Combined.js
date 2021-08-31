import React from "react"

import Code from "./../components/Code"
import codeCreation from "./code/Combined_Reduxer"
import codeHoc from "./code/Combined_Hoc"
import codeUsage from "./code/Combined_Usage"

const Combined = () => (
    <section name='combined reduxer' className='get_started'>
        <h1>Combined Reduxers</h1>
        <h2>Create Redux Objects</h2>

        <h3>Introduction</h3>
        <p>
            As <code>Redux</code> combined reducers, the Reactizy combined reduxers allow to separate your store in different
            state objects with their own state, all the actions and thunks relative to this reduxers will aso be bind under
            the same object.
        </p>

        <h3>Combined Reduxer Creation</h3>
        <Code>{codeCreation}</Code>

        <p>
            Use the <code>combine</code> function from <code>Reactizy</code> to transform your reduxer to combined reduxer.{" "}
            <br />
            The first argument is the object{"'"}s name in the redux state.
        </p>
        <Code>{codeHoc}</Code>

        <h3>Usage</h3>
        <Code>{codeUsage}</Code>

        <p>
            All the actions and thunks from combined reduxer are callable by other dispatch method in prefixing them by the
            reduxer name
        </p>
    </section>
)

export default Combined
