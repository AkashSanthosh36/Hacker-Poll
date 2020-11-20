import React, {useContext} from 'react';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

import { Link, useHistory } from 'react-router-dom'

import {navbarStyles} from '../componentsStyling/Navbar'
import { AdminContext } from '../App'

function Navbar(props) {
    const classes = navbarStyles()
    const {state, dispatch} =  useContext(AdminContext) 
    const history = useHistory()

    const renderList = () => {
        if(state) {
            return [
                <Button key={1} className={classes.button} color="inherit" component={Link} to="/addcandidate"><Typography>Add Candidate</Typography></Button>,
                <Button key={2} className={classes.button} color="secondary" variant="contained"
                    onClick = { () => {
                        localStorage.clear()
                        dispatch({type: "CLEAR"})
                        history.push('/adminsignin')
                    }}
                >
                    <Typography>
                        Logout
                    </Typography>
                </Button>
            ]
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link 
                            to={state ? '/admin' : (history.location.pathname === '/' ? '/': '/adminsignin')}
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            Hacker Poll
                        </Link>
                    </Typography>
                    {renderList()}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;