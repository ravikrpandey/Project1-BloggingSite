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
        } if (!blog) { res.status(404).send({ msg: "No document find" }) }
    }
    catch (err) {
        res.send(err.message)
    }
}
const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        if (!blogId) return res.status(400).send({ status: false, msg: "no id found" })

        let user = await blogModel.findById(req.params.blogId)

        if (!user) {
            return res.status(400).send({ status: false, msg: "no such user available" })
        }

        let updateData = req.body
        if (Object.keys(updateData).length === 0) return res.status(400).send({ status: false, msg: "data not found" })

        
        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, updateData, { new: true });
        res.status(200).send({ status: true, msg: updatedBlog })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
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
            return res.status(400).send({ status: false, message: "No such blog found" })
        }
        let Update = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: Date() }, { new: true })
        res.status(200).send({ status: true, dataa: Update })
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message });
    }
}
const deleteByQuery = async function (req, res) {
    try {
        let category = req.query.category
        let authorId = req.query.authorId
        let tags = req.query.tags
        let subcategory = req.query.subcategory
        let isPublished = req.query.isPublished
        if (!validator.isValidRequestBody(req.query)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide query details" });
        }

        if (authorId) {
            if (!validator.isValidObjectId(authorId)) {
                return res.status(400).send({ status: false, message: `authorId is not valid.` });
            }
        }
        let data = await blogModel.find({ $or: [{ category: category }, { authorId: authorId }, { tags: tags }, { subcategory: subcategory }, { isPublished: isPublished }] });
        if (!data) {
            return res.status(403).send({ status: false, message: "no such data exists" })
        }
        let Update = await blogModel.updateMany({ $or: [{ category: category }, { authorId: authorId }, { tags: tags }, { subcategory: subcategory }, { isPublished: isPublished }] }, { $set: { isDeleted: true } }, { new: true })
        res.send({ status: true, data: Update })
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message });
    }

}


module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.deleteBlogById = deleteBlogById
module.exports.deleteByQuery = deleteByQuery
module.exports.updateBlog = updateBlog





