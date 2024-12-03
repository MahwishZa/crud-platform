import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from "axios";

export default function BlogCard({ title, description, image, username, time, id, isUser, }) {
    const navigate = useNavigate();

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

    return (
        <div className="max-w-2xl mx-auto my-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {isUser && (
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleEdit}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                        <FaEdit size={24} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-red-600 hover:text-red-800 transition-colors duration-300"
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
                    <h3 className="text-lg font-semibold">{username}</h3>
                    <p className="text-gray-500 text-sm">{time}</p>
                </div>
            </div>

            <img
                src={image}
                alt="Blog"
                className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
        </div>
    );
}
