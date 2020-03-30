import React from 'react'
import { withFormik, Form } from 'formik'
import { Grid, IconButton } from '@material-ui/core';
import { Cancel, Save } from '@material-ui/icons';
import { MuiFormikInput } from './CustomInputs';
import listingsOperations from '../crud/listings';

const EditListingItem = props => {
    const { classes, setEditing } = props; 
    return (
        <Form>
            <Grid className={classes.addMarginBottom} container justify='space-between' wrap='nowrap'>
                <Grid item xs={9} className={classes.addMarginBottom}>
                    <MuiFormikInput style={{marginRight: '6%'}} placeholder='Item' type='text' id='item' name='item' inputProps={{ 'aria-label': 'item' }} />
                    <MuiFormikInput style={{fontSize: '0.9rem'}} placeholder='Description' type='text' id='description' name='description' inputProps={{ 'aria-label': 'description' }} />                    
                    <MuiFormikInput style={{fontSize: '0.9rem'}} placeholder='Location' type='text' id='location' name='location' inputProps={{ 'aria-label': 'location' }} />
                </Grid>
                <Grid item xs={3} container direction='column' justify='space-between'>
                    <MuiFormikInput placeholder='Price' type='number' id='price' name='price' inputProps={{ 'aria-label': 'price' }} />
                </Grid>
            </Grid>
            <Grid container justify='flex-end' className={classes.userIcons}>
                <IconButton type='submit' aria-label="Save" >
                    <Save />
                </IconButton>
                <IconButton onClick={() => setEditing(false)} aria-label="Cancel" >
                    <Cancel />
                </IconButton>
            </Grid>
        </Form>
    )
}

const EditListingItemForm = withFormik({
    mapPropsToValues: props => {
        const { item, description, location, price } = props.listing;
        return {
            item,
            description,
            location,
            price
        }
    },
    handleSubmit: (values, {resetForm, setSubmitting, props}) => {
        setSubmitting(true);
        const { item, description, location, price } = values;
        const listing = {
            item,
            description,
            location,
            price,
            _id: props.listing._id,
            user: props.listing.user
        }

        //crud operation
        listingsOperations.editListing(listing);
        props.editListings(listing);
        props.setEditing(false);
        resetForm();
        setSubmitting(false);
    }
})(EditListingItem);

export default EditListingItemForm;
