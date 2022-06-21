

const BlogModel1 = require("../Model/BlogModel1");
const blogModel= require("../models/BlogModel1")

const createBlog= async function (req, res) {
    let data= req.body

    let savedData= await blogModel.create(data)
    res.send({msg: savedData})
};

const getBlog= async function (req, res) {
    let blog= await blogModel.find(  {_id: user._id}  )
    res.send({msg: blog})


};

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


