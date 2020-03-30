import React from 'react';
import { useField } from 'formik';
import { TextField, Input } from '@material-ui/core';

export const MuiFormikTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <TextField 
            {...field}
            {...props}
            label={label}
            error={meta.error && meta.touched}
            helperText={ (meta.error && meta.touched) && meta.error }
        />
    )
}

export const MuiFormikInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Input 
            {...field}
            {...props}
            label={label}
            error={meta.error && meta.touched}
            // helperText={ (meta.error && meta.touched) && meta.error }
        />
    )
}

export default {
    MuiFormikTextField,
    MuiFormikInput
};