const ErrorHandler=require('express-async-handler');
const User=require('../models/User');
const Post=require('../models/Post');
const Comment=require('../models/Comment');

exports.addCommentToPost=ErrorHandler(async (req,res)=>{
    console.log(req.body);
    
    const user=await User.findById(req.user);     
    if(!user){
        return res.status(400).json({
            success:false, 
            message:'User not found'
        })
    }
    const post=await Post.findById(req.params.postId);    
    if(!post){
        return res.status(400).json({
            success:false,
            message:'Post not found'
        })
    }
   //create comment
   const comment=new Comment({
        content:req.body.content,
        user:user._id,
        post:post._id
   })
    await comment.save();
   //add comment to post
    post.comments.push(comment);
    await post.save();
    res.status(201).json({
        success:true,
        data:post,
        message:'Comment added successfully'
    })
})