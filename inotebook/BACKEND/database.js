const mongoose =require("mongoose");
const mongodburl="mongodb://localhost:27017";



async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/inotebook');
}

main()
.then(()=>{
    console.log("connect to database");
})
.catch(err => console.log(err));


module.exports=main;