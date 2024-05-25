const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

// exports.post_list = asyncHandler(async(req,res,next) =>{
//     res.send(`Not implemented: Post list`)
// })

exports.post_detail = asyncHandler(async(req,res,next) =>{
    const [post] = await Promise.all([
        Post.findById(req.params.id).populate("user").exec(),
    ]);

    if(post === null){
        const err = new Error("No Post Found")
        err.status = 404;
        return next(err);
    }
    // if(post.isPublished){} //* Implemenet this for the user interaction but not author interaction
    res.render("post-detail",{
        title:post.title,
        post:post
    })
});

exports.post_create_get = asyncHandler(async(req,res,next)=>{
    res.render("post_create",{title:"Create Post"})
})

exports.post_create_post = [
    body("title", "Title must be at least 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),
    
    asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: post create POST")  
})
]
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