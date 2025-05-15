import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Write = ({ blogId, userId }) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/comment/create-comment", {
                content,
                blog: blogId,
                user: userId,
            });
            if (data?.success) {
                toast.success("Comment added successfully!");
                setContent("");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            toast.error("Failed to add comment. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 shadow-md rounded-md"
            >
                <h2 className="text-2xl text-center mb-6">Add a Comment</h2>
                <div className="mb-4">
                    <textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your comment here..."
                        required
                        rows="4"
                        className="w-full p-2 border rounded-md"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Write;