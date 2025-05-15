import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from "axios";
import Collapse from '@mui/material/Collapse';

export default function Blog_Card({ title, description, image, username, time, id, isUser, }) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleEdit = () => {
        navigate(`/blog-details/${id}`);
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
            if (data?.success) {
                toast.success("Blog Deleted Successfully");
                window.location.reload();
            }
        } catch (error) {
            toast.error("Failed to delete the blog. Please try again");
            console.error("Delete Error:", error);
        }
    };

    const fetchComments = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/v1/comment/get-comment/${id}`);
            if (data?.success) {
                setComments(data.comments);
            }
        } catch (error) {
            toast.error("Failed to load comments.");
            console.error("Fetch Comments Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (!expanded) {
            fetchComments();
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-4 p-4 bg-[#EFF1F3] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {isUser && (
                <div className="flex justify-end space-x-2 gap-2">
                    <button
                        onClick={handleEdit}
                        className="text-blue-600 hover:text-[#009FB7] hover:scale-105 transition-colors duration-300"
                    >
                        <FaEdit size={24} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-red-600 hover:text-[#009FB7] hover:scale-105 transition-colors duration-300"
                    >
                        <FaTrash size={24} />
                    </button>
                </div>
            )}

            <div className="flex items-center space-x-4 mb-4">
                {<div className="user-logo">
                    {username?.[0]?.toUpperCase() || "User"}
                </div>}
                <div>
                    <h3 className="text-lg font-semibold text-[#151C2B]">{username}</h3>
                    <p className="text-[#2A2A2A] text-sm">{time}</p>
                </div>
            </div>

            <img
                src={image}
                alt="Blog"
                className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-bold text-[#151C2B] mb-2">{title}</h2>
            <p className="text-[#2A2A2A] text-base mb-4">{description}</p>

            <div className="flex justify-end items-center space-x-2 mb-4">
                <button
                    onClick={handleExpandClick}
                    className="btn-primary rounded p-2 hover:text-[#009FB7]"
                >
                    {expanded ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                </button>
            </div>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className="bg-white p-4 rounded-md shadow-md">
                    {loading ? (
                        <p className="text-gray-500">Loading comments...</p>
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment._id} className="border-b border-gray-200 p-2 mb-2">
                                <p className="text-base text-[#151C2B]">
                                    <strong>{comment.user.username || "Anonymous"}</strong>
                                </p>
                                <p className="text-sm text-gray-600 py-2">
                                    {comment.content}
                                </p>
                                <p className="text-xs">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-base text-center">No comments yet.</p>
                    )}
                </div>
            </Collapse>
        </div>
    );
}
