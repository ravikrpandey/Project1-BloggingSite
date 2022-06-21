const autherModel= require("../models/AutherModel1")

const createAuther= async function (req, res) {
    let data= req.body

    let savedData= await autherModel.create(data)
    res.send({msg: savedData})
}


module.exports.createAuther= createAuther;


