const ErrorHandler=require('express-async-handler');
const User=require('../models/User');
const Post=require('../models/Post');

//create Post
exports.createPost=ErrorHandler(async (req,res)=>{     
    const user=await User.findById(req.user);    
    if(!user){
        return res.status(400).json({
            success:false,
            message:'User not found'
        })
    }
    const {title,content}=req.body;
    const post=new Post({
        title,
        content,
        user:user._id
    })
    await post.save();
    user.posts.push(post);
    await user.save();
    res.status(201).json({
        success:true,
        data:post,
        message:'Post created successfully'
    })
})

exports.getPosts=ErrorHandler(async (req,res)=>{
    const posts=await Post.find().populate('user').sort({createdAt:-1});
    if(!posts){
        return res.status(400).json({
            success:false,
            message:'No posts found'
        })
    }
    res.status(200).json({ 
        success:true,
        posts
    })
})

//exports get posts by user
exports.getPostByUser=ErrorHandler(async (req,res)=>{
    const user=await User.findById(req.user).populate('posts');
    if(!user){
        return res.status(400).json({
            success:false,
            message:'User not found'
        })
    }
    res.status(200).json({
        success:true,
        fname:user.fname,
        lname:user.lname,
        posts:user.posts
    })
})

//get post by id
exports.getPostById=ErrorHandler(async (req,res)=>{
    
    const post=await Post.findById(req.params.id).populate("user").populate({
        path:'comments',
        populate:{
            path:'user',
            model:'User'
        }
    });
    if(!post){
        return res.status(400).json({
            success:false,
            message:'Post not found'
        })
    }
    res.status(200).json({
        success:true,
        data:post        
    })
})