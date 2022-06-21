
const express = require('express');
const router = express.Router();
const AutherController= require("../Controllers/AutherController")
const BlogController= require("../Controllers/BlogController")





router.post("/createAuthor", AutherController.createAuther);
router.post("/createBlog", BlogController.createBlog);
router.get("/Blogs", BlogController.getBlog);
router.put("/updateBlogs", BlogController.updateBlog);



// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;