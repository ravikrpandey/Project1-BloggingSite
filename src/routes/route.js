

const express = require('express');
const router = express.Router();
const AutherController= require("../Controller/AutherController")
const BlogController= require("../Controller/BlogController")
const md = require('../Middelware/auth1')





router.post("/Authors", AutherController.createAuther);

router.post("/Blogs", BlogController.createBlog);

router.get("/Blogs",md.loginCheck, BlogController.getBlog);

router.delete("/blogs/:blogId",md.loginCheck, BlogController.deleteBlogById);

router.delete('/blogs', BlogController.deleteByQuery );

router.put("/Blogs/:blogId", BlogController.updateBlog);

router.post("/login", AutherController.loginAuthor);


router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})







module.exports = router;


