import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
    const { id } = useParams(); // ID of the comment
    const navigate = useNavigate();
    const [content, setContent] = useState("");

    // Fetch the existing comment
    const getCommentDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/comment/get-comment/${id}`);
            if (data?.success && data?.comment) {
                setContent(data.comment.content);
            } else {
                toast.error("Comment not found");
                navigate(-1); // Navigate back if not found
            }
        } catch (error) {
            console.error("Error fetching comment:", error);
            toast.error("Failed to fetch comment details.");
        }
    };

    useEffect(() => {
        getCommentDetail();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/comment/update-comment/${id}`, {
                content,
            });
            if (data?.success) {
                toast.success("Comment updated successfully!");
                navigate(-1); // Navigate back after successful update
            }
        } catch (error) {
            console.error("Error updating comment:", error);
            toast.error("Failed to update comment. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 shadow-md rounded-md"
            >
                <h2 className="text-2xl text-center mb-6">Edit Comment</h2>
                <div className="mb-4">
                    <textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="4"
                        className="w-full p-2 border rounded-md"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default Edit;