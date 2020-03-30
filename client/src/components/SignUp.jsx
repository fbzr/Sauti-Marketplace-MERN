import React from 'react';
import { Form, withFormik, useField } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, makeStyles, Paper, Typography, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { login, register } from '../crud/auth';
import { MuiFormikTextField } from './CustomInputs';

const useStyles = makeStyles(theme => ({ 
    root: {
        width: '100%',
        margin: 0,  
        padding: 0,
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2)
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    field: {
        margin: '5px 0'
    },
    '@global': {
        'html, body, #root': {
            height: '100%'
        }
    }
  }));

const SignUpForm = (props) => {
    const { isSubmitting, values, setValues } = props;
    const classes = useStyles();
    
    const handleClickShowPassword = () => {
        console.log(props);
        setValues({ ...values,  showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <Grid container className={classes.root} >
            <Grid item lg={3} md={4} sm={6} xs={11} p={4}>
            <Paper elevation={3} spacing={2} className={classes.paper}>
                <Typography variant="h3" component="h1">
                    Sign Up
                </Typography>
                <Form width={500} autoComplete='off' className={classes.fieldsContainer}>
                    <MuiFormikTextField className={classes.field} type='text' label='Username' name='username' id='username' />
                    <MuiFormikTextField 
                        className={classes.field}
                        name='password'
                        id='password'
                        type={values.showPassword ? 'text' : 'password'}
                        label='Password' 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton tabIndex="-1" aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment> )
                        }}     
                    />
                    <MuiFormikTextField 
                        className={classes.field}
                        name='password2'
                        id='password2'
                        type='password'
                        label='Password Confirmation'   
                    />
                    <Button disabled={isSubmitting} variant="contained" color="primary" type='submit'>Submit</Button>
                </Form>
            </Paper>
            </Grid>
        </Grid>
    )
}

const SignUp = withFormik({
    // Initialize "formik states"
    mapPropsToValues: () => ({
        username: '',
        password: '',
        password2: '',
        showPassword: false
    }),
    // Create yup validation schema
    validationSchema: yup.object().shape({
        username: yup.string()
            .min(4, 'Username must have at least 4 characters')
            .required('Username is required'),
        password: yup.string()
            .min(8, 'Password must have at least 8 characters')
            .required('Password required'),
        password2: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation required')
    }),
    handleSubmit: (data, { resetForm, setSubmitting, props }) => {
        const { username, password } = data;
        
        // Register
        register({ username, password })
            .then(res => {
                setSubmitting(true);
                console.log(res);
                
                // Log in 
                login({ username, password })
                    .then(res => {
                        const { token, user_id } = res.data;
                        resetForm();
                        setSubmitting(false);
                        props.handleLogin(token, user_id);
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
})(SignUpForm)

export default SignUp
