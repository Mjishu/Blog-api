const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrpyt = require("bcryptjs")
const {body,validationResult} = require("express-validator");

exports.user_list = asyncHandler(async(req,res,next) =>{
    res.send(`Not implemented: user list`)
})


exports.user_detail = asyncHandler(async(req,res,next) =>{
    res.send(`Not impleneted: User Detail: ${req.params.id}`);
});

exports.user_create_get = asyncHandler(async(req,res,next)=>{
    res.render("createUser");
})

exports.user_create_post = [
    body("username", "Username must be atleast 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),
    body("password", "Password must be atleast 6 characters")
    .trim()
    .isLength({min:3})
    .escape(),
    
    asyncHandler(async(req,res,next)=>{
        const errors  = validationResult(req)

        if(!errors.isEmpty()){
            res.render("createUser",{
                errors:errors.array()
            })
            // console.log(errors)
            return;
        }else{
            try{
                const hashedPassword = await bcrpyt.hash(req.body.password, 10);
                const user = new User({
                    username: req.body.username,
                    password:hashedPassword,
                    isAuthor: false
                });
                const result = await user.save();
                res.redirect("/")
            }catch(err){
                return next(err)
            }
    }
})
]
exports.user_signin_get = asyncHandler(async(req,res,next)=>{
    res.render("signin")
})

exports.user_signin_post = asyncHandler(async(req,res,next)=>{
    res.send("meow") //! What is this for??
 })

exports.user_delete_get = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: User Delete GET ")  
})

exports.user_delete_post = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: user delete post")  
})

exports.user_update_get = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: user update get ")  
})

exports.user_update_post = asyncHandler(async(req,res,next)=>{
    res.send("Not Implemented: user update post")  
})