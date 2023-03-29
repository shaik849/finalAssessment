const mongoose = require('mongoose');

const {Schema} = mongoose



const postSchema =  new Schema({

  userId : {
    type : String,
    required : true
  },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
}, {timestamps: true})

const postModel = mongoose.model('Post', postSchema)

module.exports = {postModel}