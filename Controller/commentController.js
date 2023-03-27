const {commentModel, commentsModel} = require('../Model/commentModel')
const {postModel} = require('../Model/postModel');


const postComment = async (req, res) => {
try{
    if(req.user){
    const id = req.user.id
    const postAvalability = await postModel.findById({userId: id});
        if(postAvalability){
           const comment = new commentModel({
            comment : req.body.comment
           })
           console.log(comment)
        }
        else{
            throw Error(`Could not find post or not found`)
        }
    }
    else{
        throw Error('post does not exist')
    }
}
catch(err){
    console.log(err)
    res.status(400).json({message: err.message})
}
}

module.exports = {
    postComment: postComment
}