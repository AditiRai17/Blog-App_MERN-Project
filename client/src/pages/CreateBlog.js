import React, { useState } from 'react';
import { Box, Button, InputLabel, TextField, TextareaAutosize, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateBlog = () => {
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        content: '',
        image: ''
    })

    //input Change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/blog/create-blog', {
                title: inputs.title,
                description: inputs.description,
                content: inputs.content,
                image: inputs.image,
                user: id

            });
            if (data?.success) {
                toast.success('Blog created successfully');
                navigate('/my-blogs');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    width={'40%'}
                    border={2}
                    borderRadius={10}
                    padding={3}
                    margin={'auto'}
                    boxShadow={"10px 10px 20px #ccc"}
                    display={'flex'}
                    flexDirection={'column'}
                    marginTop={'40px'}
                    marginBottom={'40px'}
                >

                    <Typography variant={'h2'} textAlign={'center'} fontWeight='bold' padding={3} color={'black'} fontSize={"30px"} >Create Blog</Typography>
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: 'bold', color: 'black' }}
                    >Title</InputLabel>

                    <TextField
                        name='title'
                        value={inputs.title}
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                        placeholder='Title'
                        required
                    />

                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: 'bold', color: 'black' }}
                    >Description</InputLabel>

                    <TextField
                        name='description'
                        value={inputs.description}
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                        placeholder='Description'
                        required
                    />

                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: 'bold', color: 'black' }}
                    >Content</InputLabel>

                    <TextareaAutosize
                        name='content'
                        value={inputs.content}
                        onChange={handleChange}
                        placeholder='Content'
                        required
                    >
                    </TextareaAutosize>



                            <InputLabel
                                sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: 'bold', color: 'black' }}
                            >Image url</InputLabel>

                            <TextField
                                name='image'
                                value={inputs.image}
                                onChange={handleChange}
                                margin='normal'
                                variant='outlined'
                                placeholder='Image url'
                                required
                            />

                            <Button type='submit' color='primary' variant='contained' >Submit</Button>

                        </Box>
                    </form>
                </>
                )
}

                export default CreateBlog