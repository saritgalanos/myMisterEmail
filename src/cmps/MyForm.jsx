import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

function CustomInput(props) {
    return <TextField {...props} id="outlined-basic" label="Outlined" variant="outlined" />
}

// SignupSchema.validate({
//     firstName: 'dasdas',
//     lastName: 'asdasd',
//     email: 'ad@gmail.com',
// }).then(console.log).catch(console.log)

export function MyForm() {

    return (
        <div>
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className='formik'>
                        <Field as={CustomInput} name="firstName" />
                        {errors.firstName && touched.firstName && (
                            <div>{errors.firstName}</div>
                        )}
                        <Field as={CustomInput} name="lastName" />
                        {errors.lastName && touched.lastName && (
                            <div>{errors.lastName}</div>
                        )}
                        <Field as={CustomInput} name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <Button type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )

}
