import mongoose from 'mongoose';

const {Schema}= mongoose;

const notesSchma= new Schema({
    title:{
        type:String,
        required:true
    },
    desctiption:{
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

module.exports=mongoose.Schema('notes',notesSchma);  // create a model  name notes and it is created 