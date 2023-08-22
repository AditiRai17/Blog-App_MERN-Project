const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                succes: false,
                message: 'No blog found',
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All blogs fetched successfully',
            blogs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            succes: false,
            message: 'Error while gett ing blogs',
            error
        })
    }
}



//Create Blog

exports.createBlogController = async (req, res) => {
    try {
        const { title, description,content, image, user } = req.body;
        //validation
        if (!title || !description || !content || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields',
            });
        }
        const existingUser = await userModel.findById(user);
        //validation
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const newBlog = new blogModel({ title, description,content, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: 'Blog created successfully',
            newBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while creating blog',
            error
        })
    }

}




//Update Blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        //validation
        /*if (!title || !description || !image) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields',
            });
        }*/
        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        /*if (!blog) {
            return res.status(400).send({
                success: false,
                message: 'Blog not found',
            });
        }*/
        return res.status(200).send({
            success: true,
            message: 'Blog updated successfully',
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating blog',
            error
        })
    }
}


//single blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Single Blog fetched successfully',
            blog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while fetching blog',
            error
        })
    }
}



//Delete Blog
exports.deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        /*if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }*/
        return res.status(200).send({
            success: true,
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while deleting blog',
            error
        })
    }
}

//GET USER BLOG
exports.userBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const userBlog = await userModel.findById(id).populate("blogs");
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blogs not found with this Id',
            });
        }
        return res.status(200).send({
            success: true,
            message: 'User blog fetched successfully',
            userBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while fetching user blog',
            error
        })
    }
}