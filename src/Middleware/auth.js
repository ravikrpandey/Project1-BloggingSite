
const jwt = require("jsonwebtoken");
const blogModel = require("../Model/blogModel");

const authAndAuthorize = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];

        if (!token) return res.send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "Roshan");
        if (!decodedToken) {

            return res.status(401).send({ status: false, msg: "token is invalid" });
        }
        if (req.body.authorId) {
            let authorLoggedIn = req.body.authorId
            let authorToBeModified = decodedToken.authorId
            if (authorLoggedIn != authorToBeModified) {
                return res.status(403).send({ status: false, msg: "You are not allowed to modify or publish" });
            }
        }
        if (req.params.blogId) {
           let  blogId = req.params.blogId
            if(blogId.length!=24) return res.status(400).send({status:false, msg: "BlogId is invalid."})
            if(!await blogModel.findOne({_id:blogId}))return res.status(400).send({status:false, msg: "BlogId is invalid."})
            data = await blogModel.findById(blogId)
            if (decodedToken.authorId != data.authorId.toString()) {
            
                return res.status(403).send({ status: false, msg: "You are not allowed to modify or publish" });
            }

        }
        if (req.query.authorId) {
            authorId = req.query.authorId
            if (decodedToken.authorId != authorId) {
            
                return res.status(403).send({ status: false, msg: "You are not allowed to modify or publish" });
            }

        }



        next()
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];

        if (!token) return res.send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "Roshan");
       

        if (!decodedToken) {

            return res.status(401).send({ status: false, msg: "token is invalid" });
        }

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { authAndAuthorize,authenticate }