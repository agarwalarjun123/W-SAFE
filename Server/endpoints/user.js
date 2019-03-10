
const router = require('express').Router();
const user = require('../model/user')
const {sign} = require('jsonwebtoken')

router.post('/signup',(req,res,next)=>{
    user.findOne({name:req.body.name})
    .then(e=>{
        if(!e)
            new user({
                name : req.body.name,
                password:req.body.password,
                contacts:req.body.contacts 
            }).save()
            .then(e=>{
                res.json({msg:"done"});
            })
            .catch(err=>next(err));
        else
            res.json({msg:"user already exist"});    
    })
    .catch(err=>next(new Error(err)));


    
})
router.post('/login',(req,res,next)=>{
    user.findOne({name:req.body.name,password:req.body.password})
    .then((e)=>{
        if(e)
                            
                sign({name:req.body.name,id:e.id},process.env.secret,(err,token)=>{
                    if(err)
                        next(new Error(err))
                    res.send({token})
                })
            else 
                res.send({msg:"user credentials incorrect"});
    })

});
module.exports = router;