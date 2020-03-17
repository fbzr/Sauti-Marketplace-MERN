import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        height: 'calc(100vh - 150px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%'
    },
    image: {
        width: '100%',
        maxWidth: '600px'
    }
}))

const Homepage = () => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <img className={classes.image} src="../../sauti.png" alt="Sauti logo"/>
            <Typography variant='h3'>
                Marketplace
            </Typography>
        </Container>
    )
}

export default Homepage
