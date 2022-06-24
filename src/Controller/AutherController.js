const AutherModel1 = require("../model/AutherModel1")
const autherModel = require("../model/AutherModel1")
const validate = require("../validator/validator1")
const jwt=require("jsonwebtoken")

const createAuther = async function (req, res) {
    try {
        let data = req.body
        let val = validate.checker(data)
        if (val) {
            res.status(400).send({ invalid: val })
        }
        if (!val) {
            let savedData = await autherModel.create(data)
            res.status(201).send({ msg: savedData })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}
const loginAuthor = async function (req, res) {
    try {
        let authorEmail = req.body.email;
        // console.log(authorEmail)
        let password = req.body.password;
        let author = await AutherModel1.findOne({ email: authorEmail, password: password });
        // console.log(author)
        if (author) {
            let token = jwt.sign(
                {
                    authorId: author._id.toString(),
                    group: "twenty five",
                    member: "chetan"
                }, "Roshan"
            );
            res.status(201).send({ msg: "token sucssfully created", Token: token });
        };
        if (!author) {
            res.status(401).send({ msg: "Login deatils are invalid" })
        };
    }
    catch(err){res.status(500).send({Error:err.message})}
};


module.exports = {createAuther,loginAuthor};

