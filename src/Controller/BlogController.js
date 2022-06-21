

const blogModel = require("../model/BlogModel1")

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let AuthorId = await blogModel.find({ _id: data.authorId })
        if (AuthorId) {
            let savedData = await blogModel.create(data)
            res.status(201).send({ msg: savedData })
        }
        if (!AuthorId) {
            res.status(400).send({ msg: "authorid is not valid" })
        }
    }
    catch (err) { res.send(err.message) }
}

const getBlog = async function (req, res) {
    try {
       
        let blog = await blogModel.find();
        if (blog) {
            res.status(200).send({ msg: blog })
        } if(!blog) { res.status(404).send({ msg: "No document find" }) }
    }
    catch (err) { 
        res.send(err.message)
     }
}
module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;


