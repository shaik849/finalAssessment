const {postModel} = require('../Model/postModel');

const getSinglePostId = async (req, res) =>{
    try{
        const id = req.params.id
        console.log(id)
        const singlePost = await postModel.findById({_id : id});
        if(singlePost){
       return res.status(200).json(singlePost);
     }
     else{
        return res.status(400).json({status: "failure",message:"Couldnt find the post"})
     }
    }
    catch(err){
      return  res.status(400).json({message: err.message});
    }
}

const getAllPostsByUserId = async (req, res) =>{
    try{
        const id = req.query.user
        const allPosts = await postModel.find({userId : id});
        if(allPosts.length > 0){
       return res.status(200).json({status: "success",posts : allPosts});
      }
     else{
        return res.status(400).json({status: "failure",message:'Couldnt find the posts'})
     }
}
catch(err){
    return res.status(400).json({status:"failure",error : {message: err.message}});
} 

}

const getAllPosts = async (req, res) =>{
    const titleName = req.query.title
    console.log(titleName)
    try{
       const allPosts = await postModel.find({
        "$or": [
           {title :{
            $regex :  "(?i)"+titleName
           }}
        ]
       });
             if(allPosts){
              res.status(200).json(allPosts)
             }
             else{
                return res.status(400).json({status: "failure",message:'Could not find the posts'})
             }
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

const createPost = async (req, res) =>{
 try{   
    if(req.user){
            const postDetails = new postModel({
               userId : req.user.id,
               title : req.body.title,
               description : req.body.description
          })

          if(postDetails){
          await postDetails.save();
          res.status(200).json({status:"success",message: "post created successfully"})
          }
        
        else{
            return res.status(400).json({status: "failure",message:"cant create post"})
        }
    }else{
        return res.status(400).json({status: "failure",message:"user is not available"})
    }
    }
catch(err){
 return res.status(400).json({status: "failure",error: err.message});
    }
}

const updatePost = async (req, res) => {
    try{
        const id = req.params.id
        const checkId = await postModel.findById(id);
        if(checkId){
       const updatePost = await postModel.updateOne({_id : id},
            {
                $set: {
                    title : req.body.title,
                    description : req.body.description
                }
            })
               if(updatePost){
             return  res.status(200).json({status: "success",message: "post is updated successfully"})
        }
        else{
            res.status(400).json({status: "success",message:"cannot update post"})
        }
    }else{
        res.status(400).json({status: "success",message:"user Id is not found"})
    }
    }
    catch(err){
        res.status(400).json({status: "success",error: err.message})
    }
}

const deletePost = async (req, res) => {
    try{
        const id = req.params.id
        const checkId = await postModel.findById(id);
        if(checkId){
        const result = await postModel.findByIdAndDelete(id);
     if(result){
       return res.status(200).json({status: "success",message: "successfuly deleted"});
     }
    }else{
        return res.status(400).json({status: "success",error: err.message})
    }
}
    catch(err){
      return  res.status(400).json({status: "success",error: err.message});
    }
}

module.exports = {
    getSinglePostId : getSinglePostId,
    getAllPostsByUserId : getAllPostsByUserId,
    getAllPosts : getAllPosts,
    createPost : createPost,
    updatePost : updatePost,
    deletePost : deletePost
}