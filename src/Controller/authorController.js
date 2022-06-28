const authorModel = require("../Model/authorModel")
const validate = require("../validator/validator")
const jwt=require("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {
        let data = req.body

        let val = validate.checker(data)
        
        if ( val) {
            res.status(400).send({ status:false,msg: val })
        }
        if (!val) {
            if (await authorModel.findOne({ email: data.email })) {
                return res.status(400).send({status:false, msg:"emailid must be unique"})
              };
            let savedData = await authorModel.create(data)
            res.status(201).send({ status:true,data: savedData })
        }
    }
    catch (err) {
        res.status(500).send({status:false, msg: err.message })
    }
}
const loginAuthor = async function (req, res) {
    try {
        let authorEmail = req.body.email;
        if(!authorEmail) return res.status(400).send({status:false, msg:"email is required"})
        let password = req.body.password;
        if(!password) return res.status(400).send({status:false, msg:"Password is required"})

        let author = await authorModel.findOne({ email: authorEmail, password: password });
  
        if (author) {
            let token = jwt.sign(
                {
                    authorId: author._id.toString(),
                    group: "twenty five",
                    member: "chetan"
                }, "Roshan"
            );
            res.setHeader("x-api-token",token)
            res.status(200).send({ status:true,data:{token: token }});
        };
        if (!author) {
            res.status(400).send({ status:false,msg: "Login deatils are invalid" })
        };
    }
    catch(err){res.status(500).send({status:false,msg:err.message})}
};


module.exports = {createAuthor,loginAuthor};

