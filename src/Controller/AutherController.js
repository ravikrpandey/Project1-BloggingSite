const autherModel= require("../model/AutherModel1")
const validate= require("../validator/validator1")

const createAuther= async function (req, res) {
    try{let data= req.body
        let val=validate.checker(data)
        if(val)
        {
            res.status(400).send({invalid:val})
        }
        if(!val){
      let savedData= await autherModel.create(data)
     res.status(201).send({msg: savedData})}
    }
    catch(err){
        res.send({error:err.message})
    }
}


module.exports.createAuther= createAuther;


