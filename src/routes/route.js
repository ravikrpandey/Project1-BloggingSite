

const express = require('express');
const router = express.Router();
const AutherController= require("../Controller/AutherController")
const BlogController= require("../Controller/BlogController")





router.post("/createAuthor", AutherController.createAuther);
router.post("/createBlog", BlogController.createBlog);
router.get("/Blogs", BlogController.getBlog);
router.put("/updateBlogs", BlogController.updateBlog);
router.delete("/blogs/:blogId", BlogController.deleteBlogById);
router.delete('/blogs', BlogController.deleteBy)
router.put("/updateBlogs/:blogId", BlogController.updateBlog);








module.exports = router;


