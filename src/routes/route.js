

const express = require('express');
const router = express.Router();
const AutherController= require("../Controller/AutherController")
const BlogController= require("../Controller/BlogController")
const middleware= require("../Middleware/auth")





router.post("/Authors", AutherController.createAuther);
router.post("/login", AutherController.loginAuthor);
router.post("/Blogs", middleware.authAndAuthorize,BlogController.createBlog);

router.get("/Blogs", middleware.authenticate,BlogController.getBlog);

router.delete("/blogs/:blogId",middleware.authAndAuthorize, BlogController.deleteBlogById);

router.delete('/blogs',middleware.authAndAuthorize, BlogController.deleteByQuery );

router.put("/Blogs/:blogId",middleware.authAndAuthorize, BlogController.updateBlog);




router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})







module.exports = router;


