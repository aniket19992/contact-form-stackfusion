const mongoose= require("mongoose")
const Schema= mongoose.Schema
const UserSchema= new Schema({
    name: String,
    dob:Date,
    email:{
        type:String,
        unique:true
    },
    phone:Number
})

const UserModel = mongoose.model("Users",UserSchema)
module.exports = UserModel