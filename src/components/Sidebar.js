import React from "react"
import PropTypes from "prop-types"

import { List, ListItem } from "@material-ui/core"

import { Link } from "react-router-dom"

import { AwesomeButton } from "react-awesome-button"

import "react-awesome-button/src/styles/styles.scss"

import "./../styles/Sidebar.scss"

const map = [
    ["/", "Home"],
    ["/get-started", "Get Started"],
    ["/redux-and-reduxers", "Redux and Reduxers"],
    ["/hoc-builder", "Hoc Builder"],
    ["/combined-reduxers", "Combined Reduxer - Redux Objects"],
    ["/splitter", "Splitter"],
    ["/api", "Api"],
    ["/autobind", "Autobind"],
    ["/useMultiState", "MultiState Hook"],
]

const Sidebar = ({ closeMenu, open }) => (
    <div className={`sidebar ${open === true ? "open" : ""}`}>
        <List>
            {map.map(item => (
                <ListItem key={item[0]}>
                    <Link to={item[0]} onClick={closeMenu}>
                        <AwesomeButton>{item[1]}</AwesomeButton>
                    </Link>
                </ListItem>
            ))}
        </List>
    </div>
)

Sidebar.propTypes = {
    closeMenu: PropTypes.func,
    open: PropTypes.bool,
}

export default Sidebar
