import React from 'react'

import './../styles/HomePage.scss'

import Code from './../components/Code'

export default () => (
    <section name="homepage">
        <h1>Reactizy</h1>

        <p><small>v6.0.3</small></p>

        <p><b>Reactizy</b> is a <b>React High Order Component</b> and a toolkit allowing</p>
        <p>
            <ul>
                <li>Simplify the use of <b>react-redux</b></li>
                <li><b>Split react components</b> in order to have a better readability</li>
                <li>Providing <b>asynchronous reducers</b></li>
                <li>Call api with simply library</li>
                <li>... and some usefull utilities.</li>
            </ul>
        </p>

        <Code>npm install reactizy</Code>
    </section>
)
