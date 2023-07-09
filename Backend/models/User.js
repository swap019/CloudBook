const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique :true,
        lowercase: true, //converts all emails to lower case before saving in the database.
        required: true
    },
    password:{
        type: String,
        required:true,
        default: Date
    },
})
const User=mongoose.model('user',UserSchema)
User.createIndexes(),
module.exports=User;

