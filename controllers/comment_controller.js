const mongoose = require("mongoose");
const blogModel = require("../models/blog_model");
const commentModel = require("../models/comment_model");
const userModel = require("../models/user_model");

exports.createCommentController = async (req, res) => {
    try {
        const { content, blogId, user } = req.body;

        // Validate fields
        if (!content || !blogId || !user) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            });
        }

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid blog ID"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).send({
                success: false,
                message: "Invalid user ID"
            });
        }

        // Check if blog exists
        const blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found"
            });
        }

        // Defensive check for `comments`
        if (!Array.isArray(blog.comments)) {
            blog.comments = [];
        }

        // Create and save comment
        const newComment = new commentModel({ content, blog: blogId, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await newComment.save({ session });
            blog.comments.push(newComment);
            await blog.save({ session });
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

        // Populate the comment with user data
        const populatedComment = await commentModel.findById(newComment._id).populate("user", "username");

        return res.status(201).send({
            success: true,
            message: "Comment added successfully!",
            comment: populatedComment
        });
    } catch (error) {
        console.error("Error in createCommentController:", error);
        return res.status(500).send({
            success: false,
            message: "Error creating comment",
            error: error.message
        });
    }
};


exports.updateCommentController = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).send({
                success: false,
                message: "Content is required"
            });
        }

        const updatedComment = await commentModel.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).send({
                success: false,
                message: "Comment not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Comment updated successfully",
            updatedComment
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error updating comment",
            error
        });
    }
};

exports.getCommentsByBlogController = async (req, res) => {
    try {
        const { blogId } = req.params;

        // Validate the Blog ID
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid blog ID"
            });
        }

        const comments = await commentModel.find({ blog: blogId }).populate("user", "username");

        if (!comments || comments.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No comments found for this blog"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Comments retrieved successfully",
            comments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error retrieving comments",
            error: error.message
        });
    }
};


exports.deleteCommentController = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await commentModel.findByIdAndDelete(id).populate("blog");

        if (!comment) {
            return res.status(404).send({
                success: false,
                message: "Comment not found"
            });
        }

        const blog = comment.blog;
        if (blog) {
            blog.comments.pull(comment._id);
            await blog.save();
        }

        return res.status(200).send({
            success: true,
            message: "Comment deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error deleting comment",
            error
        });
    }
};