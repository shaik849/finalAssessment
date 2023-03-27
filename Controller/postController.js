const {postModel} = require('../Model/postModel');

const viewSinglePost = async (req, res) =>{
    try{
        const id = req.params.id
        console.log(id)
        const singlePost = await postModel.findById({_id : id});
        if(singlePost){
       return res.status(200).json(singlePost);
     }
     else{
        throw Error('Couldnt find the post')
     }
    }
    catch(err){
      return  res.status(400).json({message: err.message});
    }
}

const viewAllPosts = async (req, res) =>{
    try{
       const allPosts = await postModel.find();
             if(allPosts){
              res.status(200).json(allPosts)
             }
             else{
                throw Error('Could not find the posts')
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
                userId: req.user.id,
               title : req.body.title,
               description : req.body.description
          })

          if(postDetails){
          await postDetails.save();
          res.status(200).json({"message": "success"})
          }
        
        else{
            throw Error("cant create post")
        }
    }else{
        throw Error("user is not available")
    }
    }
catch(err){
 return res.status(400).json({message: err.message});
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
             return  res.status(200).json({"message": "success"})
        }
        else{
            throw Error("cannot update post")
        }
    }else{
        throw Error("Id is not found")
    }
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}

const deletePost = async (req, res) => {
    try{
        const id = req.params.id
        const checkId = await postModel.findById(id);
        if(checkId){
        const result = await postModel.findByIdAndDelete(id);
     if(result){
       return res.status(200).json({"message": "successfuly deleted"});
     }
    }else{
        throw Error("Id is not found")
    }
}
    catch(err){
      return  res.status(400).json({error: err.message});
    }
}

module.exports = {
    viewSinglePost : viewSinglePost,
    viewAllPosts : viewAllPosts,
    createPost : createPost,
    updatePost : updatePost,
    deletePost : deletePost
}