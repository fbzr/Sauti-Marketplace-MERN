import React from 'react'
import { Card, CardContent, Typography, makeStyles, Grid, IconButton } from '@material-ui/core';
import { LocationOn, AccountCircle, DeleteOutline, Edit } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        minHeight: '150px'
    },
    infoText: {
        display: 'flex',
        alignItems: 'center',
        margin: '4px 0'
    },
    itemTitle: {
        borderBottom: '2px inset'
    },
    addMarginBottom: {
        marginBottom: '1rem'
    }
}))

const ListingItem = ({ listing, userId }) => {
    const { id, user_id, username, location, item, description, price } = listing;
    const classes = useStyles();
    
    console.log(`userId: ${userId}`);
    console.log(`user_id: ${user_id}`);
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card className={classes.root}>
                <CardContent>
                    <Grid container justify='space-between' wrap='nowrap'>
                        <Grid item xs={9}>
                            <Typography className={classes.itemTitle} color='textPrimary' variant="h5" component="h2">
                                {item}
                            </Typography>
                            <Typography className={classes.addMarginBottom} variant="body2" color="textSecondary" component="p">
                                {description}
                            </Typography>
                            <Typography className={classes.infoText} variant="body2" color="textSecondary" component="p">
                                <AccountCircle /> {username}
                            </Typography>
                            <Typography className={classes.infoText} variant="body2" color="textSecondary" component="p">
                               <LocationOn /> {location}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} container direction='column' justify='space-between'>
                            <Typography variant="subtitle1">
                                ${price.toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* { (user_id === userId) &&
                    (<Grid container justify='flex-end'>
                        <IconButton aria-label="Edit listing">
                            <Edit />
                        </IconButton>
                        <IconButton aria-label="Edit listing">
                            <DeleteOutline />
                        </IconButton>
                    </Grid>) } */}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ListingItem
