const {commentModel, commentsModel} = require('../Model/commentModel')
const {postModel} = require('../Model/postModel');


const createPostComment = async (req, res) => {
try{
    const postId = req.params.id
    if(postId){
    const postAvalability = await postModel.findOne({_id : postId})
        if(postAvalability){
           const comment = new commentModel({
            comment : req.body.comment
           })
         const comments  = await comment.save()
         if(comments){
            const allComments = new commentsModel({
                postId : postId,
                comments : comment
            })
                const addComments = await commentsModel.findOneAndUpdate({postId : postId},{
                            $push : {
                                comments : comment
                            }
                        })
                         if(addComments){
                          return res.status(200).json({ status: "success",message: "new Comment updated"})
                             }
                                await allComments.save()
                                return res.status(200).json({ status: "success",message: "Comment saved"})
                          
 }
         return   res.status(400).json({status: "failure",message:'saving comment'})
         
        }
            return res.status(400).json({status: "failure",message:`Could not find post or not found`})
        
    }
        return res.status(400).json({status: "failure",message:'post does not exist'})
    
}
catch(err){
    console.log(err)
    res.status(400).json({status: "failure",message: err.message})
}
}

const showAllCommentsOfPost = async (req, res) => {
    try{
   const id = req.params.id
   if (!id){res.status(400).json({status: "failure",message: "id not found"})}
    const comments = await commentsModel.findOne({_id :id});
    if (comments){
        res.status(200).json({status: "failure",comments : comments})
    }
        res.status(400).json('comments does not exist')
    
   
}
catch(err){
    res.status(400).json({status: "failure",error: err.message})
}
}

const updateComment = async (req, res) =>{
    try{
         const commentId = req.params.commentId 
         const id = req.params.id
         if (!commentId && !id){res.status(404).json({status: "failure",message: "comment not found"})}
          
                const update = await commentModel.findOneAndUpdate({_id : commentId},{
                    $set : {
                        comment : req.body.comment
                    }
                })
                console.log(update.comment)
                const setComments = await commentsModel.findOneAndUpdate({"comments._id": commentId, _id: id},
                        {
                    $set : {  
                      "comments.$.comment": update.comment
                    }
                })
                 if(setComments){
                  return res.status(200).json({ "status": "success","message": "new Comment updated"})
                     }
                    
                   return res.status(400).json({status: "failure",message:`Invalid comment`})
    }
    catch(err){
        res.status(400).json({status: "failure",error : err.message})
    }
}

const deleteComment = async (req, res) => {
   try{
    const commentId = req.params.commentId 
    const id = req.params.id
    const comments = await commentModel.findOne({_id : commentId})
    if (!comments){
        res.status(404).json({status: "failure",message: "comment not found"})
     }
        const deleteComment = await commentModel.findOneAndDelete({_id : commentId})
        const deleteComments = await commentsModel.findByIdAndUpdate({_id: id},{
            $pull:{
                comments: {_id:req.params.commentId}
            }  
    })
        if(deleteComment && deleteComments){
           res.status(200).json({status: "success",message: "Comment deleted successfully"})
        }
        res.status(400).json({status: "failure",message:"cant delete comment"})
    
}
catch(err){
    res.status(404).json({status: "failure", message: err.message})
}
}

module.exports = {
    createPostComment: createPostComment,
    showAllCommentsOfPost : showAllCommentsOfPost,
    updateComment : updateComment,
    deleteComment : deleteComment
}