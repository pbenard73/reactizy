import React from "react"

import { List, ListItem } from "@material-ui/core"

import { Link } from "react-router-dom"

import { AwesomeButton } from "react-awesome-button"

import "react-awesome-button/src/styles/styles.scss"

import "./../styles/Sidebar.scss"

const map = [
    ['/', 'Home'],
    ['/get-started', 'Get Started'],
    ['/redux-and-reduxers', 'Redux and Reduxers'],
    ['/hoc-builder', 'Hoc Builder'],
    ['/combined-reduxers', 'Combined Reduxer - Redux Objects'],
    ['/splitter', 'Splitter'],
    ['/api', 'Api'],
    ['/autobind', 'Autobind'],
    ['/useMultiState', 'MultiState Hook'],
]

export default props => (
    <div className={`sidebar ${props.open === true ? 'open' : ''}`}>
        <List>
            {map.map(item => {
                return (
                <ListItem>
                    <Link to={item[0]} onClick={props.closeMenu}>
                        <AwesomeButton>{item[1]}</AwesomeButton>
                    </Link>
                </ListItem>
            )})}
        </List>
    </div>
)
