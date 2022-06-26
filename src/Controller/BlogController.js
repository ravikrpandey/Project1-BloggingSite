const blogModel = require("../model/blogModel")
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
        //checking if there is any filter present or not
        if (Object.keys(filters).length >= 1) {
            //adding more conditions to the filter
            filters.isDeleted = false
            filters.isPublished = true
            //checking if we have a tag filter to match
            if (filters.tags) {
                let tagArray
                if (filters.tags.includes(",")) {
                    tagArray = filters.tags.split(",").map(String).map(x => x.trim())
                    filters.tags = { $all: tagArray }
                } else {
                    tagArray = filters.tags.trim().split(" ").map(String).map(x => x.trim())
                    filters.tags = { $all: tagArray }
                }
            }


            //checking if we have a subcatagory filter to match
            if (filters.subcategory) {
                let subcatArray
                if (filters.subcategory.includes(",")) {
                    subcatArray = filters.subcategory.split(",").map(String).map(x => x.trim())
                    filters.subcategory = { $all: subcatArray }
                }
                else {
                    subcatArray = filters.subcategory.trim().split(" ").map(String).map(x => x.trim())
                    filters.subcategory = { $all: subcatArray }
                }
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
        //get the blogId from params
        let blogId = req.params.blogId;

        let user = await blogModel.findById(req.params.blogId);

        //checking if any data associated with the blogId exist or not
        //Also making sure that isDeleted is false
        if (Object.keys(user) === 0 || user.isDeleted === true) {
            return res.status(404).send({ status: false, msg: " no such data found" });
        }

        //Getting the user data from the req.body
        let userData = req.body;
        //returning an eeror if we dont have any data in the req.body
        if (Object.keys(userData).length === 0) return res.status(400).send({ status: false, msg: "no data to update" })

        //checking if tags is present to be uppdated
        if (userData.tags) {
            //pushing the data into the tag array
            userData.$push = { tags: userData.tags }
            //deleting the existing tags key
            delete userData.tags
        }

        //checking if subcatagory is present to be updated
        if (userData.subcategory) {
            //pusing the date into the subcatagory array
            userData.$push = { subcategory: userData.subcategory }
            // deleting the existing subcategory key
            delete userData.subcategory
        }

        userData.isPublished = true
        userData.publishedAt = new Date()
        //updating the data
        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, userData, { new: true });
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
            return res.status(400).send({ status: false, msg: `BlogId is invalid.` });
        }

        let data = await blogModel.findOne({ _id: id });
        if (!data) {
            return res.status(400).send({ status: false, msg: "No such blog found" })
        }
        let Update = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: Date() }, { new: true })
        res.status(200).send({ status: true, data: Update })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
const deleteByQuery = async function (req, res) {
    try {
        let conditions = req.query
        conditions.isDeleted=false
        console.log(conditions)
        if (!validator.isValidRequestBody(req.query)) {
            return res.status(400).send({ status: false, msg: "Invalid request parameters. Please provide query details" });
        }
        
        if (!authorId) {
            return res.status(400).send({ status: false, msg: "authorId is required" })
        }
        else {
            if (!validator.isValidObjectId(authorId)) {
                return res.status(400).send({ status: false, msg: `authorId is not valid.` });
        }
        }
        let data = await blogModel.find(conditions);
        // console.log(dataa)
        if (!data) {
            return res.status(403).send({ status: false, msg: "no such data exists" })
        }
        let Update = await blogModel.updateMany(conditions, { $set: { isDeleted: true, deletedAt:new Date()} }, { new: true })
        res.send({ status: true, data: Update })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

}


module.exports = {createBlog,createBlog,getBlog,deleteBlogById,deleteByQuery,updateBlog};
