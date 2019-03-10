
const router = require('express').Router();
const bcrypt = require('bcrypt');
const user = require('../model/user')
const {sign} = require('jwt')

router.post('/signup',(req,res,next)=>{
    const hash = bcrpyt.hashSync(req.password,process.env.salt);
    user.findOne({name:req.body.name})
    .then(e=>{
        if(!e)
            new user({
                name : req.name,
                password: hash,
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
    user.findOne({name:req.body.name})
    .then((e)=>{
        if(e)
            if(bcrypt.compareSync(req.password,e.password))
                
                sign(req.body.password,process.env.secret,(err,token)=>{
                    if(err)
                        next(new Error(err))
                    res.send({token})
                })
            else 
                res.send({msg:"user credentials incorrect"});
    })

});
module.exports = router;