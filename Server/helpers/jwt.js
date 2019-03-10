const {verify} = require("jsonwebtoken");


module.exports = (req,res,next)=>{
    let token = req.get("Authorization");

    if(!token)
        return res.json({message:"Missing auth token"});
    
    verify(token,process.env.SECRET,(err,decodedData)=>{
        if(err)
            return res.json({err});
        req.data = decodedData;
        next();
    });
}
