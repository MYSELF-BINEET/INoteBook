const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes.js");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// add a new note using post operation s

// /api/auth/addnote    // login is required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter the proper title").isLength({ min: 3 }).exists(),
    body("description", "enter the proper the description").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { title, description, tag } = req.body;

    try {
      if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
      }

      const savednotes = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });

      const saved = await savednotes.save();

      res.send(saved);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);


// update the note by id 
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag}=req.body;

  //create a new object 
  const newnote={};
  if(title){ newnote.title=title;}

  if(description){newnote.description=description;}

  if(tag){ newnote.tag=tag;}

  try {
    const noteid=req.params.id;

    const prenote=await Notes.findById(noteid);
    if(!prenote){
      res.status(401).send("notes is not defined");
    }
  
    if(prenote.user.toString()!==req.user.id){
      res.status(401).send("you are not allowed to access");
    }
    // prenote == uptade note
    const uptadenote=await Notes.findByIdAndUpdate(noteid,{$set:newnote},{new:true});
    // res.send({uptadenote});
    // res.send(req.user.id);

    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }

})


// delete notes 

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
  try {
    const noteid=req.params.id;
    const note=await Notes.findById(noteid);
    if(!note){
      res.status(401).send("Note does not exists");
    }

    if(note.user.toString()!==req.user.id){
      res.status(401).send("Not allowed");
    }

    const removenote=await Notes.findByIdAndDelete(noteid);
    // res.send(removenote);
    

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
})

module.exports = router;

// this is not create and user define and good
