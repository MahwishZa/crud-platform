// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");

const userRoutes    = require("./routes/user_routes");
const blogRoutes    = require("./routes/blog_routes");
const commentRoutes = require("./routes/comment_routes");

connectDB();

const app = express();

// JSON + logging + CORS
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API routes
app.use("/api/v1/user",    userRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/blog",    blogRoutes);

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "client", "build");
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// Start listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  const mode = process.env.APP_MODE || process.env.NODE_ENV || "development";
  console.log(`Server running in ${mode} on port ${PORT}`);
});
