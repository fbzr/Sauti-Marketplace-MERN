import React, { useState } from 'react';
import { Card, CardContent, Typography, makeStyles, Grid, IconButton } from '@material-ui/core';
import { LocationOn, AccountCircle, Edit, DeleteOutline } from '@material-ui/icons';
import EditListingItemForm from './EditListingItemForm';
import listingsOperations from '../crud/listings';

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
    },
    userIcons: {
        position: 'absolute',
        bottom: '0',
        right: '0'
    }
}))

const ListingItem = ({ listing, userId, deleteListing, editListings }) => {
    const { user, location, item, description, price } = listing;
    const classes = useStyles();

    const [editing, setEditing] = useState(false);
    
    const handleDeleteListing = () => {
        listingsOperations.removeListing(listing._id);
        deleteListing(listing);
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card className={classes.root}>
                <CardContent style={{position: 'relative'}}>
                    {editing ? 
                        <EditListingItemForm classes={classes} listing={listing} setEditing={setEditing} editListings={editListings} /> 
                        : 
                        <>
                            <Grid container justify='space-between' wrap='nowrap'>
                                <Grid item xs={9}>
                                    <Typography className={classes.itemTitle} color='textPrimary' variant="h5" component="h2">
                                        {item}
                                    </Typography>
                                    <Typography className={classes.addMarginBottom} variant="body2" color="textSecondary" component="p">
                                        {description}
                                    </Typography>
                                    <Typography className={classes.infoText} variant="body2" color="textSecondary" component="p">
                                        <AccountCircle /> {user.username}
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
                            { (user.id === userId) && !editing && (
                                <Grid container justify='flex-end' className={classes.userIcons}>
                                    <IconButton aria-label="Edit listing" onClick={() => setEditing(true)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton aria-label="Remove listing" onClick={handleDeleteListing}>
                                        <DeleteOutline />
                                    </IconButton>
                                </Grid>
                            )} 
                        </> 
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ListingItem
