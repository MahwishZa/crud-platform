const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Content is required"]
        },
        blog: {
            type: mongoose.Types.ObjectId,
            ref: "Blog",
            required: [true, "Blog ID is required"]
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"]
        }
    },
    { 
        timestamps: true 
    }
);

const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;