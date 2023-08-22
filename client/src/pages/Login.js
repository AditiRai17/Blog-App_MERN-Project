import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //state
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })


    //handle input changes
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/login', { email: inputs.email, password: inputs.password });
            if (data.success) {
                localStorage.setItem('userId', data?.user._id);
                dispatch(authActions.login());

                toast.success("User Login Successful");
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={450}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    margin={'auto'}
                    marginTop={5}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    borderRadius={5}
                >
                    <Typography variant='h4'
                        sx={{ textTransform: "uppercase" }}
                        padding={3}
                        textAlign={'center'}
                    >Login</Typography>

                    <TextField placeholder='email'
                        value={inputs.email}
                        onChange={handleChange}
                        name='email'
                        margin='normal'
                        type={'email'}
                        required
                    />
                    <TextField placeholder='password'
                        value={inputs.password}
                        onChange={handleChange}
                        name='password'
                        margin='normal'
                        type={'password'}
                        required
                    />
                    <Button
                        type='submit'
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        variant='contained'
                        color='primary'
                    >Login</Button>
                    <Button
                        onClick={() => navigate('/register')}
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >Not a user? Please Register</Button>
                </Box>
            </form>
        </>
    )
}


export default Login