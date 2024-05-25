const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");

exports.comment_list = asyncHandler(async(req,res,next) =>{
    res.send(`Not implemented: comment list`)
})

exports.comment_detail = asyncHandler(async(req,res,next) =>{
    res.send(`Not impleneted: comment Detail: ${req.params.id}`);
});

exports.comment_create_get = asyncHandler(async(req,res,next)=>{
res.send("Not Implemented: comment create GET ")  
})

exports.comment_create_post = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: comment create POST")  
})

exports.comment_delete_get = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: comment Delete GET ")  
})

exports.comment_delete_post = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: comment delete post")  
})

exports.comment_update_get = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: comment update get ")  
})

exports.comment_update_post = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: comment update post")  
})