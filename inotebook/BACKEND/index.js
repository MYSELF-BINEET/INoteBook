const connectMongodb=require("./database");

const express= require('express');
const app=express();

const port=5000;
const  bodyParser = require('body-parser')
// const User=require('./models/user.js');

const userRouter=require("./routes/user.js");
const notesRouter=require("./routes/notes.js");

app.use(express.json());


app.use('/api/auth',userRouter);
app.use('/api/notes',notesRouter);

app.get('/',(req,res)=>{
    res.send("work is going");
});

app.listen(port,()=>{
    console.log(`example app listing at ${port}`);
})

connectMongodb();