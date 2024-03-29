const mongoose=require('mongoose');
// const { Schema } = mongoose;
// const passportLocalMongoose = require('passport-local-mongoose');


const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
// userSchema.plugin(passportLocalMongoose);  // passport local mongoose
let User=mongoose.model('User',userSchema);     // create a model name user    and its is created
module.exports=User;