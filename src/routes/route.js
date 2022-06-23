

const express = require('express');
const router = express.Router();
const AutherController= require("../Controller/AutherController")
const BlogController= require("../Controller/BlogController")
const middleware= require("../Middleware/auth2")





router.post("/Authors", AutherController.createAuther);
router.post("/login", AutherController.loginAuthor);
router.post("/Blogs", middleware.validateToken,BlogController.createBlog);

router.get("/Blogs", middleware.validateToken,BlogController.getBlog);

router.delete("/blogs/:blogId",middleware.validateToken, BlogController.deleteBlogById);

router.delete('/blogs',middleware.validateToken, BlogController.deleteByQuery );

router.put("/Blogs/:blogId",middleware.validateToken, BlogController.updateBlog);




router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})







module.exports = router;


