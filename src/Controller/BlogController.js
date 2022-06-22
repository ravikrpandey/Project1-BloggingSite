const blogModel = require("../model/BlogModel1")
const validator = require("../validator/validator")

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


const deleteBlogById = async function (req, res) {

    try {
        let id = req.params.blogId;
        if (!validator.isValidObjectId(id)) {
            return res
              .status(400)
              .send({ status: false, message: `BlogId is invalid.` });
          }
        let data = await blogModel.findOne({ _id: id });
        if (!data) {
            return res.status(403).send({ status: false, message: "No such blog found"  })
        }
        let Update = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: Date()}, { new: true })
        res.status(200).send({ status: true, dataa: Update })
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message });
    }
}
    const deleteBy = async function (req, res) {
        try{
            let category = req.query.category
            let authorId = req.query.authorId
            let tags = req.query.tags
            let subcategory = req.query.subcategory
            let isPublished = req.query.isPublished
            
            let data = await blogModel.find({ $or: [{ category: category }, { authorId: authorId }, { tags: tags }, { subcategory: subcategory }, { isPublished: isPublished }] });
            if (!data) {
                return res.status(403).send({ status: false, message: "no such data exists" })
            }
            let Update = await blogModel.updateMany({$or:[{category: category  },{ authorId: authorId },{tags: tags},{subcategory: subcategory},{isPublished: isPublished} ]},{$set: { isDeleted: true }}, { new: true })              
            res.send({ status: true, data: Update })
        }catch(err){
            res.status(500).send({ status: false, Error: err.message }); 
        }
       
    }


module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.deleteBlogById = deleteBlogById
module.exports.deleteBy= deleteBy
module.exports.updateBlog= updateBlog




