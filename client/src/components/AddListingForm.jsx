import React from 'react';
import { CardContent, Card, Collapse, Button, TextField, Grid, makeStyles } from '@material-ui/core';
import { Form, withFormik, useField } from 'formik';
import * as yup from 'yup';
import listingsOperations from '../crud/listings';
import { MuiFormikTextField } from './CustomInputs';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        maxWidth: '300px',
        position: 'absolute',
        zIndex: '1'
    }
}))

const AddListingForm = (props) => {
    const { isSubmitting, expanded } = props;
    const classes = useStyles();
    
    return (
        <Grid container justify='flex-end'>
            <Collapse className={classes.root} in={expanded} timeout="auto" unmountOnExit>
                <Card>
                    <CardContent>
                        <Form>
                            <MuiFormikTextField type='text' label='Item' name='item' id='item' />
                            <MuiFormikTextField type='text' label='Description' name='description' id='description' />
                            <MuiFormikTextField type='text' label='Location' name='location' id='location' />
                            <MuiFormikTextField type='number' label='Price' name='price' id='price' />
                            <Button disabled={isSubmitting} variant="contained" color="primary" type='submit'>Enter</Button>
                        </Form>
                    </CardContent>
                </Card>
            </Collapse>
        </Grid>
        
    )
}

const AddListing = withFormik({
    mapPropsToValues: () => ({
        item: '',
        description: '',
        location: '',
        price: ''
    }),
    validationSchema: yup.object().shape({
        item: yup.string()
            .min(2, 'Item must have at least 2 characters')
            .required('Item name is required'),
        description: yup.string()
            .min(2, 'Description must have at least 2 characters')
            .required('Description required'),
        location: yup.string()
            .min(2, 'Location must have at least 2 characters')
            .required('Location required'),
        price: yup.number()
            .required('Price required')
    }),
    handleSubmit: (values, { resetForm, setSubmitting, props }) => {
        setSubmitting(true);
        
        const data = {
            location: values.location,
            item: values.item,
            description: values.description,
            price: values.price
        }
        
        listingsOperations.addListing(data)
            .then(res => {
                setSubmitting(false);
                resetForm();
                props.resetListings();
            })
            .catch(err => console.log(err))
        
    }
})(AddListingForm);

export default AddListing