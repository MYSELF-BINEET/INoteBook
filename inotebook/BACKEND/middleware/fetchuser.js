const  jwt = require('jsonwebtoken');
const JWT_SCERET="ilovecoding";


const fetchuser=(req,res,next)=>{

    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"});
    }

    try {
        const string=jwt.verify(token,JWT_SCERET);
    req.user=data.user;
    next();
    } catch (error) {
        res.status(401).send({error:'please authenticate using a valid token'});
    }

    
}
module.exports=fetchuser;