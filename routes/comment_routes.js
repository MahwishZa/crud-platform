const express = require("express");
const { getCommentsByBlogController, createCommentController, updateCommentController, deleteCommentController } = require("../controllers/comment_controller");

const router = express.Router();

router.get("/get-comment/:blogId", getCommentsByBlogController);
router.post("/create-comment", createCommentController);
router.put("/update-comment/:id", updateCommentController);
router.delete("/delete-comment/:id", deleteCommentController);

module.exports = router;