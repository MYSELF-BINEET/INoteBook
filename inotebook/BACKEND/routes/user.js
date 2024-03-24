const express=require("express");
const router=express.Router();

const User=require("../models/user");  // model of user schema
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const JWT_SCERET="ilovecoding";

// const passport=require("passport");
// const LocalStrategy=require("passport-local");

// const passportLocalMongoose=require("passport-local-mongoose");

// passport.use(User.createStrategy());

// passport.use(new LocalStrategy(User.authenticate()));


// const userController=require('../controllers/user');




router.post('/createuser',[body('email',"enter the valid email").isEmail(),body('name',"enter the valid name").isLength({min:3}),body('password',"enter the valid passowrod and at least 5 characters.").isLength({min:5})],async(req,res)=>{
    const result = validationResult(req);
    // res.send(req.body);
    try{
         let users=await User.findOne({email: req.body.email});

        if (users) {
            return res.status(400).json({error:"sorry a user with this email already exits"});
        }else{
            const salt=await bcrypt.genSalt(10);
            secPass=await bcrypt.hash(req.body.password,salt);
                const user=await User.create({
                    name:req.body.name,
                    password:secPass,
                    email:req.body.email,
                })

                const userId={user:{
                    id:user.id
                }
            }

                const authToken=jwt.sign(userId, JWT_SCERET);
                res.send({authToken});
                // res.send(user);
                // user.save();
                if (!result.isEmpty()) {
            
               return  res.status(400).json({ errors: result.array() });
            }
        }
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
    
})

module.exports=router;