const mongoose = require("mongoose");
const blogModel = require("../models/blog_model");
const userModel = require("../models/user_model");

exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No Blogs found"
            });
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "All Blogs listed",
            blogs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while getting Blogs",
            error
        });
    }
};

exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please provide all Fields"
            });
        }
        const exisitingUser = await userModel.findById(user);
        if (!exisitingUser) {
            return res.status(404).send({
                success: false,
                message: "Unable to find user"
            });
        }

        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        exisitingUser.blogs.push(newBlog);
        await exisitingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while creating blog",
            error
        });
    }
};

exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            message: "Blog Updated!",
            blog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while updating Blog",
            error
        });
    }
};

exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Fetch single Blog",
            blog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while getting single Blog",
            error
        });
    }
};

exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while deleting Blog",
            error
        });
    }
};

exports.userBlogControlller = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");

        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found"
            });
        }
        return res.status(200).send({
            success: true,
            message: "User Blogs listed",
            userBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in User Blog",
            error
        });
    }
};