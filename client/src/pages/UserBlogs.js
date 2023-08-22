import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([])

    //get user blogs
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserBlogs();
    }, []);
    console.log(blogs);
    return (
        <div>
            {blogs && blogs.length > 0 ? (blogs.map((blog) => <BlogCard
                id={blog._id}
                isUser={true}
                title={blog.title}
                description={blog.description}
                content={blog.content}
                image={blog.image}
                username={blog.user.username}
                time={blog.createdAt}
            />)) : (<h1>NO BLOG CREATED BY YOU YET</h1>)}
        </div>
    )
}

export default UserBlogs