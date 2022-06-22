

const express = require('express');
const router = express.Router();
const AutherController= require("../Controller/AutherController")
const BlogController= require("../Controller/BlogController")





router.post("/Authors", AutherController.createAuther);

router.post("/Blogs", BlogController.createBlog);

router.get("/Blogs", BlogController.getBlog);

router.delete("/blogs/:blogId", BlogController.deleteBlogById);

router.delete('/blogs', BlogController.deleteByQuery );

router.put("/Blogs/:blogId", BlogController.updateBlog);

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})







module.exports = router;


