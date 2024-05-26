const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user")

exports.index = asyncHandler(async(req,res,next)=>{
    const allPosts = await Post.find({}, "title date description user")
        .sort({user:1})
        .populate("user")
        .exec()

    // console.log(req.user)
    res.render("index",
        {title:"Home Page",
        post_list: allPosts, 
        user:req.user //? The log in didnt seem to work before because I didnt have this line
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
    res.render("postDetail",{
        title:post.title,
        post:post
    })
});

exports.post_create_get = asyncHandler(async(req,res,next)=>{
    res.render("postCreate",{title:"Create Post"})
})

exports.post_create_post = [
    body("title", "Title must be at least 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),
    
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            res.render("postCreate", {title:"Create Post", errors:errors.array()});
            return
        }else{
            try{
                const newPost = new Post({
                    title:req.body.title,
                    description: req.body.description,
                    isPublished: req.body.isPublished,
                    date: new Date(),
                    user: req.user 
                });
                const result = await newPost.save();
                res.redirect("/")
            }catch(err){
                return next(err)
            }
        }
        
})
]

exports.post_delete_get = asyncHandler(async(req,res,next)=>{
    const [post] = await Promise.all([
        Post.findById(req.params.id).exec(),
    ])

    if(post === null){
        res.redirect("/")
    }

    res.render("post_delete", {title: "Delete Post", post:post})
})

exports.post_delete_post = asyncHandler(async(req,res,next)=>{
    const [post] = await Promise.all([
        Post.findById(req.params.id).exec(),
    ])
    
    await Post.findByIdAndDelete(req.body.postid)
    res.redirect("/")
})

exports.post_update_get = asyncHandler(async(req,res,next)=>{
    const [post] = await Promise.all([
        Post.findById(req.params.id).exec(),
    ])

    if(post === null){
        const err = new Error("Post not found")
        err.status=404;
        res.redirect("/")
    }
    res.render("postCreate", {title:post.title, post:post})
})

exports.post_update_post = [
    body("title", "Title must be at least 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),
    
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            res.render("postCreate", {title:"Create Post", errors:errors.array()});
            return
        }else{
            try{
                const newPost = new Post({
                    title:req.body.title,
                    description: req.body.description,
                    isPublished: req.body.isPublished,
                    date: new Date(), //? Figure out how to keep the original date?
                    user: req.user.username
                });
                const result = await Post.findByIdAndUpdate(req.params.id, newPost, {});
                res.redirect(result.url)
            }catch(err){
                return next(err)
            }
        }
})]