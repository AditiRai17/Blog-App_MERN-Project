const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    content:
    {
        type: String,
        required: [true, 'Content is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'user id is required']
    },
}, { timestamps: true });

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;