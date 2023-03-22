const Model = require('../Model/apiModel')
const jwt = require("jsonwebtoken")
const { authSchema } = require('../ErrorHandlar/errorHandler')

function createToken(id){
    return jwt.sign({id}, process.env.SECRET_KEY)
}

const signUp = async (req, res) => {
    try{
        const result = await authSchema.validateAsync(req.body)
        const doesExist = await Model.findOne({email: result.email})
        if(doesExist){
            return   res.status(400).json({"message": "email already exists"})

         }
        if(result){
           const reqData =  new Model(result)
           await reqData.save()
           return res.status(201).json({
           message : "data sent successfully",
         })
        }
        else{
            throw Error("Couldn't get my data")
        }
    }catch(err){
        return res.status(400).json({"error" : err+ " error"})
    } 
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(email && password){
    const user = await Model.loggedin(email, password)
    const result = await Model.findOne({email: user.email })
    return res.status(200).json({
         token : createToken(result._id)
     })
        }
        else{
            throw Error("Couldn't get my data")
        }
}
catch(err){
    return res.status(400).json({error : "check email or password"+ err })
 }
}

const profile = async (req, res) => {
    try{
        if(req.data){
        const result = await Model.findById(req.data.id)
      return res.status(200).json({user : {
            email : result.email,
            firstName : result.firstName,
            lastName : result.lastName,
            companyName : result.companyName,
            role : result.role,    
        }})
    }else{
        throw  Error(`Couldn not find`)
    }
    }catch(err){
     return res.status(400).json({error : "check the authentication "+ err })
    }
}

module.exports = {
    signUp: signUp,
    login : login,
    profile : profile
}