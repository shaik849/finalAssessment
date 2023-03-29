const Model = require('../Model/authModel')
const jwt = require("jsonwebtoken")
const { authSchema } = require('../Validation/authValidaton')

function createToken(id){
    return jwt.sign({id}, process.env.SECRET_KEY,{ expiresIn: '1h'})
}

const signUp = async (req, res) => {
    try{
        const result = await authSchema.validateAsync(req.body)
        const doesExist = await Model.findOne({email: result.email})
        if(doesExist){
            return   res.status(400).json({"status": "failure","message": "email already exists"})

         }
        if(result){
           const reqData =  new Model(result)
           await reqData.save()
           return res.status(201).json({
            "status": "success",
           message : "data sent successfully",
         })
        }
        else{
              return res.status(400).json({"status": "failure","error": err.message})
        }
    }catch(err){
        return res.status(400).json({"status": "failure","error" : err.message})
    } 
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(email && password){
    const user = await Model.loggedin(email, password)
    const result = await Model.findOne({email: user.email })
    return res.status(200).json({
        status: "success",
         token : createToken(result._id)
     })
        }
        else{
        res.status(401).json({"status": "failure",error: err.message})
        }
}
catch(err){
    return res.status(400).json({"status": "failure",error : "check email or password"+ err })
 }
}

const profile = async (req, res) => {
    try{
        const profileData = await Model.findById(req.user.id)
        if(profileData){
      return res.status(200).json({
            "status": "success",
            user : {
            email : profileData.email,
            firstName : profileData.firstName,
            lastName : profileData.lastName,
            companyName : profileData.companyName,
            role : profileData.role,    
     } })
    }
    else{
        res.status(400).json({"status": "failure"})
    }
    }catch(err){
     return res.status(400).json({"status": "failure", error : "check the authentication "+ err })
    }
}

module.exports = {
    signUp: signUp,
    login : login,
    profile : profile
}