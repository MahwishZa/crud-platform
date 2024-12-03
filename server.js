const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user_routes");
const blogRoutes = require("./routes/blog_routes");

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running ${process.env.DEV_MODE} on PORT ${PORT}`)
});