import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // Fetch blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update the blog. Please try again");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 shadow-md rounded-md"
      >
        <h2 className="text-2xl text-center mb-6">
          Update Blog
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="form-label"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="form-label"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            rows="4"
            className="form-textarea"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="form-label"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 btn-secondary transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;