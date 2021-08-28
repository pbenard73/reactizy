import React from "react"
import PropTypes from "prop-types"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

import style from "react-syntax-highlighter/dist/esm/styles/prism/vs-dark"

import "./../styles/Code.scss"

const Code = ({ children }) => (
    <SyntaxHighlighter language='javascript' style={style} className='code_wrapper nodrag'>
        {children}
    </SyntaxHighlighter>
)

Code.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default Code
