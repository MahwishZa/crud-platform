import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Create = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created Successfully!");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 shadow-md rounded-md"
      >
        <h2 className="text-2xl text-center mb-6">
          Create a Blog Post
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
            name="title"
            value={inputs.title}
            onChange={handleChange}
            id="title"
            required
            className="form-textarea"
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
            name="description"
            value={inputs.description}
            onChange={handleChange}
            id="description"
            required
            rows="4"
            className="form-textarea"
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
            name="image"
            value={inputs.image}
            onChange={handleChange}
            id="image"
            required
            className="form-textarea"
          />
        </div>  
        <button
          type="submit"
          className="w-full py-2 px-4 btn-primary transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;