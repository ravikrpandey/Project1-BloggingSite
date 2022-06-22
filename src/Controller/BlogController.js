

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
const updateBlog = async function(req, res) {

    try {
        let userId = req.params.userId;
        let user = await BlogModel1.findById(req.params.userId);
    
        if (!user) {
          return res.status(401).send("No such user exists");
        }
    
        let userData = req.body;
        let updatedBlog = await BlogModel1.findOneAndUpdate({ _id: userId }, userData, { new: true });
        res.status(200).send({ msg: "updated blog document Successfully", data: updatedBlog });
    
      } catch (err) {
        console.log("This is the error:", err.message)
        res.status(500).send({ mgs: "Error", error: err.message })
      }
    };



module.exports.createBlog= createBlog;
module.exports.getBlog= getBlog;
module.exports.updateBlog= updateBlog;



