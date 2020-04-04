const router = require('express').Router();
const User  = require('../models/User');
const {registerValidation , loginValidation}= require('../routes/validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get("/register",function(req,res){
    res.render("register");
});
router.post('/register',async (req,res)=>{
   // validate first
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // cheak email exist or not
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('email already exist');

    //hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //create a new user
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
    try {
        const savedUser = await user.save();
        //res.send({user:user._id});
        res.redirect("/indexnote")
    } catch (err) {
        res.render("register");
    }
});
//login
router.get("/login",function(req,res){
    res.render("login");
});
router.post('/login',async(req,res)=>{
 //validate first
   const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
     // cheak email exist or not
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email  wrong');
    //password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid pass');
     
    //create and assign a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).redirect("/indexnote");
   
});

module.exports = router;
