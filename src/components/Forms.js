import {
    Alert,
    Button,
    Card,
    CircularProgress,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../service/firebase/auth';
// import { MazeBoard } from './MazeBoard';
export const RegistrationForm = ({ goToLogin }) => {
    const [btnLoading, setbtnLoading] = useState(false);
    const [alertMsg, setalertMsg] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email')
                .required('Email required'),
            username: Yup.string().required('Username required'),
            password: Yup.string()
                .required('Password required')
                .min(8, 'Password too short -  should be atleast 8 characters'),
        }),
        onSubmit: async (values) => {
            setbtnLoading(true);
            try {
                if (register(values.username, values.email, values.password)) {
                    setbtnLoading(false);
                    alert('account created please login');
                    
                        goToLogin();
                } else {
                    setbtnLoading(false);
                    setalertMsg('Unable to create account');
                }
            } catch (err) {
                console.log(err);
                setalertMsg('Smething went wrong! ');
            }
        },
    });
    return (
        <div>
            <Card
                sx={{
                    mx: 'auto',
                    padding: '2rem',
                    display: 'flex',
                    maxWidth: '20rem',
                    flexDirection: 'column',
                    rowGap: '1rem',
                }}
            >
                <Typography variant='h5' sx={{ alignSelf: 'center' }}>
                    Registration Form
                </Typography>
                <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='username'
                    type='text'
                    value={formik.values.username}
                    label='Username'
                    helperText={
                        formik.touched.username && formik.errors.username
                    }
                />
                <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='email'
                    type='text'
                    value={formik.values.email}
                    label='Email'
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    label='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='password'
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    autoComplete='current-password'
                />

                <Button
                    onClick={() => formik.handleSubmit()}
                    variant='contained'
                >
                    {btnLoading ? (
                        <CircularProgress sx={{ color: 'white' }} />
                    ) : (
                        'Sign Up'
                    )}
                </Button>
                {alertMsg && <Alert severity='error'>{alertMsg}</Alert>}

                <Typography
                    sx={{ cursor: 'pointer', alignSelf: 'center' }}
                    onClick={goToLogin}
                    variant='subtitle1'
                >
                    Already registered?
                </Typography>
            </Card>
        </div>
    );
};

export const SignIn = ({ goToRegistration }) => {
    const navigate = useNavigate();
    const [btnLoading, setbtnLoading] = useState(false);
    const [alertMsg, setalertMsg] = useState(null);
    const formik = useFormik({
        initialValues: {
            email: '',

            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email')
                .required('Email required'),
            password: Yup.string().required('Password required'),
        }),
        onSubmit: async (values) => {
            setbtnLoading(true);
            try {
                const userdata = await login(values.email, values.password);
                if (userdata) {
                    localStorage.setItem('userdata', JSON.stringify(userdata));
                    if (userdata.isadmin) navigate('/userPlay');
                    else navigate('/game');

                    console.log('signed in');
                    setbtnLoading(false);
                } else {
                    setalertMsg('Incorrect email or password');
                    setbtnLoading(false);
                }
            } catch (err) {
                console.log(err);
                setalertMsg('Something went wrong try again');
            }
        },
    });
    return (
        <div>
            <Card
                sx={{
                    mx: 'auto',
                    padding: '2rem',
                    display: 'flex',
                    maxWidth: '20rem',
                    flexDirection: 'column',
                    rowGap: '1rem',
                }}
            >
                <Typography variant='h5' sx={{ alignSelf: 'center' }}>
                    Sign In
                </Typography>

                <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='email'
                    type='text'
                    value={formik.values.email}
                    label='Email'
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    label='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='password'
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    autoComplete='current-password'
                />

                <Button
                    onClick={() => formik.handleSubmit()}
                    variant='contained'
                >
                    {btnLoading ? (
                        <CircularProgress
                            sx={{
                                color: 'white',
                            }}
                        />
                    ) : (
                        'Sign In'
                    )}
                </Button>
                {alertMsg && <Alert severity='error'>{alertMsg}</Alert>}

                <Typography
                    variant='subtitle1'
                    sx={{ alignSelf: 'center', cursor: 'pointer' }}
                    onClick={goToRegistration}
                >
                    New user? Register here
                </Typography>
            </Card>
        </div>
    );
};
