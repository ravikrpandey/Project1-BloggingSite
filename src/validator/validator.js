const mongoose = require("mongoose");


const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };

  const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0; 
  };


  module.exports.isValidObjectId =   isValidObjectId
  module.exports.isValidRequestBody =   isValidRequestBody
