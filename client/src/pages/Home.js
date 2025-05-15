import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import img from "../assets/img.jpeg";
import Blog_Card from "../components/Blog_Card";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div id="blog" className="py-16">
      <motion.div
        className="container rounded mx-auto p-6 text-center text-white h-screen flex flex-col justify-center items-center relative"
        style={{
          width: '90%',
          maxWidth: '1200px',
          height: '600px',
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.h1
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2, ease: 'easeOut' },
          }}
          whileTap={{ scale: 0.98 }}
          className="image-heading"
        >
          Connecting Developers Through Code
        </motion.h1>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="text-bold text-white relative"
        >
          Share your tech journey, explore full-stack tutorials, and dive into real-world engineering stories from developers around the globe
        </motion.span>
      </motion.div>
      <div id="all-blogs" className="container mx-auto px-4 py-6">
        <motion.h2
          className="mt-6 px-6 py-2 text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Recent Posts
        </motion.h2>
        <div className="grid grid-cols-1 gap-8">
          {blogs &&
            blogs.map((blog) => (
              <motion.div
                key={blog?._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Blog_Card
                  id={blog?._id}
                  isUser={localStorage.getItem("userId") === blog?.user?._id}
                  title={blog?.title}
                  description={blog?.description}
                  image={blog?.image}
                  username={blog?.user?.username}
                  time={blog.createdAt}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
