const {postModel} = require('../Model/postModel');
const Model = require('../Model/authModel')

const displayPost = async (req, res) =>{
    console.log(req.params.id)
    try{
        const result = await postModel.findById(req.params.id);
        console.log(result)
     if(result){
        console.log(result)
       return res.status(200).json(result);
     }
     else{
        throw Error('Couldn\'t find')
     }
    }
    catch(err){
        console.log(err)
      return  res.status(400).json({message: err.message});
    }
}

const createPost = async (req, res) =>{
    try{
        console.log(req.user)
        if(req.user){
           const getModelData = await postModel.findById(req.user.id);
           if(getModelData){
            throw Error("ID is already exist")
        }
        else{
            const result = new postModel({
                userId: req.user.id,
               title : req.body.title,
               description : req.body.description
          })
          await result.save();
          res.status(200).json({"message": "success"})
        }
    }
}
catch(err){
 return res.status(400).json({message: err.message});
    }
}

const updatePost = async (req, res) => {
    try{
        const checkId = await postModel.findById(req.params.id);
        if(checkId){
       const updatePost = await postModel.updateOne({_id :req.params.id},
            {
                $set: {
                    title : req.body.title,
                    description : req.body.description
                }
            })
               if(updatePost){
                console.log(updatePost)
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
        const checkId = await postModel.findById(req.params.id);
        if(checkId){
        const result = await postModel.findByIdAndDelete(req.params.id);
     if(result){
       return res.status(200).json({"message": "successfuly deletes"});
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
    displayPost: displayPost,
   createPost: createPost,
   updatePost: updatePost,
   deletePost: deletePost
}