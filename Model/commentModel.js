const mongoose = require('mongoose')

const {Schema} = mongoose;

const commentSchema = new Schema({
    comment : {
        type : String,
        required : true
    }
})

const commentsSchema = new Schema({
    postId : { type: String, required : true},
    comments: [commentSchema]
        
},{timestamps: true})
const commentModel = mongoose.model('Comment', commentSchema)
const commentsModel = mongoose.model('Comments', commentsSchema)

module.exports = {commentModel, commentsModel}