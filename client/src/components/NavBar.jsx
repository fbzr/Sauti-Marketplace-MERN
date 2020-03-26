import React, { Fragment } from 'react';
import { AppBar, Toolbar, Tabs, Tab, makeStyles, Container, IconButton, Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    appbar: {
        backgroundColor: theme.palette.secondary.main
    },
    tab: {
        backgroundColor: '#fff',
        marginBottom: '20px'
    },
    navHeader: {
        fontSize: '30px',
        fontFamily: 'Montserrat',
        letterSpacing: '-1px',
        fontWeight: '600',
        color: '#fff',
        margin: '0',
        textTransform: 'none'
    },
    span: {
        color: '#e84c3d'
    }
}))

const Navbar = ({ handleLogout }) => {
    const classes = useStyles();
    const locationPathName = useLocation().pathname;
    const protectedRoutes = ['/prices', '/listings', '/' ];
    const nonProtectedRoutes = [ '/login', '/signup' ];

    return (
        <Fragment>
            <AppBar className={classes.appbar} position="static">
                <Container>
                    <Toolbar>
                        <div style={{flexGrow: '1'}}>
                            <IconButton>
                                <p className={classes.navHeader}>Sauti<span className={classes.span}>.</span></p>
                            </IconButton>
                        </div>
                        <div>
                            <Button onClick={() => handleLogout()}>
                                <p className={classes.navHeader} style={{fontSize: '20px'}}>Logout</p>
                            </Button>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            { sessionStorage.getItem('token') ?
                <Tabs className={classes.tab} value={protectedRoutes.includes(locationPathName) ? locationPathName : '/' } indicatorColor='primary' textColor='primary' centered>
                    <Tab label="Home" component={Link} value="/" to='/' />
                    <Tab label="Prices" component={Link} value="/prices" to='/prices' />
                    <Tab label="Listings" component={Link} value="/listings" to='/listings' />
                </Tabs>
                : 
                <Tabs className={classes.tab} value={nonProtectedRoutes.includes(locationPathName) ? locationPathName : '/login' } indicatorColor='primary' textColor='primary' centered>
                    <Tab label="Login" component={Link} value="/login" to='/login' />
                    <Tab label="Sign Up" component={Link} value="/signup" to='/signup' />
                </Tabs>
            }
        </Fragment>
    )
}

export default Navbar
