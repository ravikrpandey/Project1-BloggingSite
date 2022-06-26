

const express = require('express');
const router = express.Router();
const authorController= require("../Controller/authorController")
const blogController= require("../Controller/blogController")
const middleware= require("../Middleware/auth")





router.post("/authors", authorController.createAuthor);

router.post("/login", authorController.loginAuthor);

router.post("/blogs", middleware.authAndAuthorize,blogController.createBlog);

router.get("/blogs", middleware.authenticate,blogController.getBlog);

router.delete("/blogs/:blogId",middleware.authAndAuthorize, blogController.deleteBlogById);

router.delete('/blogs',middleware.authAndAuthorize, blogController.deleteByQuery );

router.put("/blogs/:blogId",middleware.authAndAuthorize, blogController.updateBlog);




router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})







module.exports = router;


