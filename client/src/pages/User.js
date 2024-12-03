import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/Blog_Card";

const User = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-4xl text-center p-8 mb-4">Your Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                id={blog._id}
                isUser={true}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user.username}
                time={blog.createdAt}
              />
            ))
          ) : (
            <h2 className="text-2xl text-center p-8 mb-4">You haven’t created any blogs yet</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;