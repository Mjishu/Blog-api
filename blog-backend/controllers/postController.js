const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user")

const dateStyle = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full"
})

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
    .isLength({min:2})
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
                    body: req.body.body,
                    isPublished: req.body.isPublished,
                    date: dateStyle.format(new Date()),
                    user: req.user ,
                    image: req.body.image || "data:image/jpeg;base64,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"
                });
                console.log(newPost.date)
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