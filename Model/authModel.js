const mongoose =  require('mongoose');
const bcrypt = require('bcrypt')

const { Schema } = mongoose;


const userSchema = new Schema({
    email: {
        type : String,
        required : [true, "email required"],
        unique : true,
    },
    password : {
        type : String,
        required :true
    },
    firstName: {
        type : String,
        required : [true, "firstname required"]
    },
    lastName: {
        type : String,
        required : [true, "lastname required"]  
    },
    companyName : {
        type : String,
        required : [true, "companyname required"]
    },
    role : {
        type : String,
        required : [true, "role required"]
    },
   
}, { timestamps : true})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt) 
    next();
  })

  userSchema.statics.loggedin = async function (email, password){
    const user = await this.findOne({email: email});
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user;
        }
            throw Error("password error")
    }
        throw Error("user not found")
}


const Model = mongoose.model('user', userSchema);

module.exports = Model;