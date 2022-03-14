const User=require('../models/User');
const bcrypt=require('bcrypt');
const ErrorHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
const validator=require('validator')


exports.register=ErrorHandler(async (req,res)=>{
    const {fname,lname,email,password}=req.body;
    if(!fname || !lname || !email || !password){
        return res.status(400).json({
            success:false,
            message:'Please enter all fields'
        })
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:'Please enter a valid email'
        })
    }
    if(password.length<6){
        return res.status(400).json({
            success:false,
            message:'Password must be at least 6 characters'
        })
    }
    if(password.length>20){
        return res.status(400).json({
            success:false,
            message:'Password must be less than 20 characters'
        })
    }
 
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:'Email already exists'
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);     
    const newUser=new User({
        fname,
        lname,
        email,
        password:hashedPassword
    });
    await newUser.save();
    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
    res.status(201).json({
        success:true,       
        token
    })
})

//login user
exports.login=ErrorHandler(async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:'Email not found'
        })
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:'Invalid password'
        })
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.status(200).json({
        success:true,
        token
    })
})

//get user by id
exports.getUser=ErrorHandler(async (req,res)=>{ 
    const user=await User.findById(req.params.id).populate('posts');
    if(!user){
        return res.status(400).json({
            success:false,
            message:'User not found'
        })
    }
    res.status(200).json({
        success:true,
        data:user
    })
})

//get all users
exports.getAllUsers=ErrorHandler(async (req,res)=>{
    const users=await User.find().populate('posts').sort({createdAt:-1});
    if(!users){
        return res.status(400).json({
            success:false,
            message:'No users found'
        })
    }
    res.status(200).json({
        success:true,
        data:users
    })
})

//dashboard
exports.dashboard=ErrorHandler(async (req,res)=>{  
    const user=await User.findById(req.user);
    if(!user){
        return res.status(400).json({
            success:false,
            message:'User not found'
        })
    }
    res.status(200).json({
        success:true,
        data:user
    })
})

