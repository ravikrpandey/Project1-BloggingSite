const mongoose = require("mongoose");


const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };


  module.exports.isValidObjectId =   isValidObjectId