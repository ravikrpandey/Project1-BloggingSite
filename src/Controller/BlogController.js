

const blogModel= require("../models/BlogModel1")

const createBlog= async function (req, res) {
    let data= req.body

    let savedData= await blogModel.create(data)
    res.send({msg: savedData})
}

const getBlog= async function (req, res) {
    let blog= await blogModel.find(  {_id: user._id}  )
    res.send({msg: blog})
}
module.exports.createBlog= createBlog;
module.exports.getBlog= getBlog;


