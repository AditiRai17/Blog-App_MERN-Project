import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, InputLabel, TextField, TextareaAutosize, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';



const BlogDetails = () => {
    const [blog, setBlog] = useState({})
    const id = useParams().id;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    //get blog details
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
            if (data?.success) {
                setBlog(data?.blog);

                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    content: data?.blog.content,
                    image: data?.blog.image
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBlogDetail();
    }, [id]);




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
            const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                content: inputs.content,
                image: inputs.image,
                user: id

            });
            if (data?.success) {
                toast.success('Blog updated');
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
                    width={'50%'}
                    border={3}
                    borderRadius={10}
                    padding={3}
                    margin={'auto'}
                    boxShadow={"10px 10px 20px #ccc"}
                    display={'flex'}
                    flexDirection={'column'}
                    marginTop={'30px'}
                >

                    <Typography variant={'h2'} textAlign={'center'} fontWeight='bold' padding={3} color={'deepskyblue'} >Update Blog</Typography>
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}
                    >Title</InputLabel>

                    <TextField
                        name='title'
                        value={inputs.title}
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                        required
                    />

                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}
                    >Description</InputLabel>

                    <TextField
                        name='description'
                        value={inputs.description}
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                        required
                    />


                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}
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
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}
                    >Image URL</InputLabel>

                    <TextField
                        name='image'
                        value={inputs.image}
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                        required
                    />

                    <Button type='submit' color='warning' variant='contained' >Update</Button>

                </Box>
            </form>
        </>
    )
}
export default BlogDetails