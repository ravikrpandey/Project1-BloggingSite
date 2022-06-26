

const express = require('express');
const router = express.Router();
const authorController= require("../Controller/authorController")
const blogController= require("../Controller/blogController")
const middleware= require("../Middleware/auth")





router.post("/Authors", authorController.createAuthor);

router.post("/login", authorController.loginAuthor);

router.post("/Blogs", middleware.authAndAuthorize,blogController.createBlog);

router.get("/Blogs", middleware.authenticate,blogController.getBlog);

router.delete("/blogs/:blogId",middleware.authAndAuthorize, blogController.deleteBlogById);

router.delete('/blogs',middleware.authAndAuthorize, blogController.deleteByQuery );

router.put("/Blogs/:blogId",middleware.authAndAuthorize, blogController.updateBlog);




router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})







module.exports = router;


