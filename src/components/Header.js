import React from "react"
import PropTypes from "prop-types"
import { AppBar, IconButton, Toolbar, Button, Tooltip, Typography } from "@material-ui/core"

import GitHubIcon from "@material-ui/icons/GitHub"

import "./../styles/Header.scss"

const Header = ({ toggleMenu }) => (
    <AppBar className='topbar' position='fixed'>
        <Toolbar>
            <Typography variant='h5' noWrap>
                Reactizy
            </Typography>
            <div>
                <Tooltip title='Show on Github' placement='bottom'>
                    <a href='https://github.com/pbenard73/reactizy'>
                        <IconButton>
                            <GitHubIcon />
                        </IconButton>
                    </a>
                </Tooltip>
                <Tooltip title='Menu' placement='bottom'>
                    <Button onClick={toggleMenu} id='top_menu'>
                        Menu
                    </Button>
                </Tooltip>
            </div>
        </Toolbar>
    </AppBar>
)

Header.propTypes = {
    toggleMenu: PropTypes.func,
}

export default Header
