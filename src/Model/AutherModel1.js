const Express = require('express')
const { default: mongoose } = require('mongoose')
const Mongoose = require('mongoose') 

const autherSchema = new mongoose.Schema( {

   fname: {
    type: String,
    required: true
   },

   lname: {
    type: String,
    required: true
   },

   title: {
    type: String,
    required: true,
    enum: ["Mr", "Mrs", "Miss"]
   },

   email: {
    type: String,
    unique: true
   },

   password: {
    type: String,
    required: true
   }



},{timestamps: true});

module.exports = mongoose.model('Auther', autherSchema); //authers
