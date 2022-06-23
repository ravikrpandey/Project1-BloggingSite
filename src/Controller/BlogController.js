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
    catch (err) { res.status(500).send(err.message) }
}


const getBlog = async function (req, res) {
    try {
        //getting data from query params
        let filters = req.query
        console.log(filters)
        //checking if there is any filter present or not
        if (Object.keys(filters).length >= 1) {
            //adding more conditions to the filter
            filters.isDeleted = false
            filters.isPublished = true
            //checking if we have a tag filter to match
            if (filters.tags) {
                //if we have a tag filter then we are adding this condition to the filter
                filters.tags = { $elemMatch: { $eq: filters.tags } }
                console.log(filters)
            }
            //checking if we have a subcatagory filter to match
            if (filters.subcategory) {
                //if we have a subcatagory filter then we are adding this conditon to the filter
                filters.subcategory = { $elemMatch: { $eq: filters.subcategory } }
            }
            //finding the data using the filter
            let filteredBlogs = await blogModel.find(filters)
            if (filteredBlogs.length === 0) return res.status(404).send({ status: false, msg: "No such data available" })
            else return res.status(200).send({ status: true, msg: filteredBlogs })
        }
        let blogs = await blogModel.find({ isDeleted: false, isPublished: true })
        if (blogs.length == 0) res.status(404).send({ status: false, msg: "No result found" })
        res.status(200).send({ status: true, msg: blogs })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const updateBlog = async function (req, res) {

    try {
        let blogId = req.params.blogId;
        if (!blogId) return res.status(400).send({ status: false, msg: "no id found" })
        // console.log(/blogId)
        let user = await blogModel.findById(req.params.blogId);
        // console.log(user)

        if (Object.keys(user) === 0 || user.isDeleted === true) {
            return res.status(401).send({ status: false, msg: " no such data found" });
        }

        let userData = req.body;
        if (Object.keys(userData).length === 0) return res.status(400).send({ status: false, msg: "no data to update" })
        // console.log(userData)
        userData.isPublished = true
        userData.publishedAt = new Date()
        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, userData, { new: true });
        console.log(updatedBlog)
        res.status(200).send({ status: true, msg: updatedBlog });

    } catch (err) {
        console.log("This is the error:", err.message)
        res.status(500).send({ status: false, msg: err.message })
    }
};


const deleteBlogById = async function (req, res) {

    try {
        let id = req.params.blogId;
        if (!validator.isValidObjectId(id)) {
            return res.status(400).send({ status: false, message: `BlogId is invalid.` });
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




