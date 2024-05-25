const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req,res,next)=>{
    const allPosts = await Post.find({}, "title date description user")
        .sort({user:1})
        .populate("user")
        .exec()

    res.render("index",
        {title:"Home Page",
        post_list: allPosts,
        user: req.user
        }
    )
})

exports.post_list = asyncHandler(async(req,res,next) =>{
    res.send(`Not implemented: Post list`)
})

exports.post_detail = asyncHandler(async(req,res,next) =>{
    res.send(`Not impleneted: post Detail: ${req.params.id}`);
});

exports.post_create_get = asyncHandler(async(req,res,next)=>{
res.send("Not Implemented: post create GET ")  
})

exports.post_create_post = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: post create POST")  
})

exports.post_delete_get = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: post Delete GET ")  
})

exports.post_delete_post = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: post delete post")  
})

exports.post_update_get = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: post update get ")  
})

exports.post_update_post = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: post update post")  
})