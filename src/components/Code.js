import React from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './../styles/Code.scss'

export default props => (
    <SyntaxHighlighter language="javascript" style={coy} className="code_wrapper">
      {props.children}
    </SyntaxHighlighter>    
)
