

const blogModel = require("../models/BlogModel1")

const createBlog = async function (req, res) {
    let data = req.body

    let savedData = await blogModel.create(data)
    res.send({ msg: savedData })
}

const getBlog = async function (req, res) {
    let blog = await blogModel.find({ _id: user._id })
    res.send({ msg: blog })
}

const deleteBlogById = async function (req, res) {

    try {
        let id = req.params.blogId;
        let data = await blogModel.findOne({ _id: id });
        if (!data) {
            return res.status(403).send({ status: false, message: "no such user exists" })
        }
        let Update = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: Date()}, { new: true })
        res.status(200).send({ status: true, data: Update })
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message });
    }
    const deleteByQuery = async function (req, res) {
        let category = req.query.category
        let authorId = req.query.authorId
        let tags = req.query.tags
        let subcategory = req.query.subcategory
        let isPublished = req.query.isPublished
        let data = await blogModel.find({ $or: [{ category: category }, { authorId: authorId }, { tags: tags }, { subcategory: subcategory }, { isPublished: isPublished }] });
        if (!data) {
            return res.send({ status: false, message: "no such data exists" })
        }
        let Update = await blogModel.updateMany({$or:[{category: category  },{ authorId: authorId },{tags: tags},{subcategory: subcategory},{isPublished: isPublished} ]},{$set: { isDeleted: true }}, { new: true })              
        res.send({ status: true, data: Update })
    }
}

module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.deleteBlogById = deleteBlogById;


