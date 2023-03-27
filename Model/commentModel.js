const mongoose = require('mongoose')

const {Schema} = mongoose;

const commentSchema = new Schema({
    comment : {
        type : String,
        required : true
    }
})

const commentsSchema = new Schema({
    userId : { type: String, required : true},
    comments :   {
        type: mongoose.Types.ObjectId,
        ref: 'commentSchema'
        }
})
const commentModel = mongoose.model('comment', commentSchema)
const commentsModel = mongoose.model('Comments', commentsSchema)

module.exports = {commentModel, commentsModel}