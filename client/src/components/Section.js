import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Section = ({ blogId, userId }) => {
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
                toast.success("Comment added successfully");
                setContent("");
            }
        } catch (error) {
            toast.error("Failed to add comment.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md">
            <textarea
                placeholder="Write your comment here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="2"
                required
                className="w-full p-2 border rounded-md"
            ></textarea>
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Submit
            </button>
        </form>
    );
};

export default Section;