const mongoose=require('mongoose');


// const {Schema}= mongoose;

const notesSchma= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"Genarel"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

let notes=mongoose.model('Notes',notesSchma);  // create a model  name notes and it is created 
module.exports=notes;