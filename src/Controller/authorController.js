const authorModel = require("../Model/authorModel")
const validate = require("../validator/validator")
const jwt=require("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {
        let data = req.body
        let val = validate.checker(data)
        varidator
        if (val) {
            res.status(400).send({ invalid: val })
        }
        if (!val) {
            let savedData = await authorModel.create(data)
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
        let author = await authorModel.findOne({ email: authorEmail, password: password });
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


module.exports = {createAuthor,loginAuthor};

