const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const mongoose = require("mongoose")
const cors = require("cors")
// ?-------------Authentication imports--------------------------
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo")

//-----------------------Data Imports----------------------------------------
const blogRouter = require("./routes/blogs");
const User = require("./models/user")
const Posts = require("./models/posts")

const app = express();

// -------------------------------view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const corsOptions ={
  origin:"*",
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//*-------------------MongoDB Connection---------------------------------
mongoose.set("strictQuery", "false")
const mongoDB  = process.env.MONGOAPI

main().catch((err) => console.log(err));
async function main(){
  await mongoose.connect(mongoDB)
}
app.use(session({secret: process.env.SESSIONSECRET, resave:false,saveUninitialized:false, store: MongoStore.create({mongoUrl: process.env.MONGOAPI})}));
app.use(passport.initialize())
app.use(passport.session());

app.use('/', blogRouter);
// app.use("/blog", blogRouter)

//?-------------------------Authentication-------------------------------------------
passport.use(
  new LocalStrategy(async(username,password,done) =>{
    try{
      const user = await User.findOne({username:username})
      if (!user){
        return done(null,false, {message: "Incorrect Username!"})
      }
      const match = await bcrypt.compare(password,user.password);
      if(!match){
        return done (null,false, {message:"Incorrect Password"})
      }; 
      return done(null,user);
    }catch(err){
      return done(err)
    }
  })
)

passport.serializeUser((user,done)=>{
  done(null,user.id)
});

passport.deserializeUser(async (id,done)=>{
  try{
    const user = await User.findById(id);
    done(null,user);
  }catch(err){
    done(err)
  }
})

app.post("/api/user/log-in", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return next(err);
    }
    if (!user) {
      console.log("Sign in attempted and failed");
      return res.json({message:"failed to login, is your username and password correct?"}); // failureRedirect
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error during login:", err);
        return next(err);
      }
      console.log("Sign in attempted and successful");
      return res.json({message:"success"}); // successRedirect
    });
  })(req, res, next);
});

app.get("/api/log-out", (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    console.log("loggin out")
    res.json({success:true})
  })
})


// app.get("/api", (req,res) =>{ //?  I should just be able to get the data from the mongo DB
//   res.setHeader("Content-Type", "application/json")
//   res.json({"messages":[
//     "reply", "not a reply", "i dont wanna talk to you"
//   ]})
// })

app.get("/api/post", async(req,res)=>{
  try{
    const posts = await Posts.find().populate("user")
    res.json(posts)
  }catch(err){
    res.status(500).json({message: "error fetching from db", error:err})
  }
})

app.delete("/api/post/:id/delete", async(req,res)=>{
  const itemId = req.body.id
  try{
    await Posts.findByIdAndDelete(itemId)
    res.status(200).json({message:"Item Deleted Succesfully"})
  }catch(err){
    res.status(500).json({message:"Message failed to delete", err})
  }
})

const dateStyle = new Intl.DateTimeFormat("en-us", {
  dateStyle: "full"
})

app.post("/api/post/create", async(req,res) => {
    const newPost = new Posts({
      // image: req.body.image,
      image: "data:image/jpeg;base64,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",
      user: req.user,
      date: dateStyle.format(new Date()),
      title: req.body.title,
      description: req.body.description ,
      body: req.body.body,
      isPublished: req.body.isPublished
    })
    await newPost.save()
    console.log(newPost)
    // const newData = req.body
    // console.log(newData)
})

app.put("/api/post/:id/edit", async(req,res)=>{
  const contentId = req.params.id;
  const bodyContent = req.body;

  try{
      const updatedPost = await Posts.findByIdAndUpdate(contentId, 
        { 
        title:bodyContent.title,
        description: bodyContent.description,
        body: bodyContent.body,
        isPublished: bodyContent.isPublished,
        // image:bodyContent.image
      }, {new:true});
      if(!updatedPost){
        return res.status(400).send({message:"Post not found"})
      }
      res.status(200).json(updatedPost)
  }catch(error){
      console.log(error)
      res.status(500).send({message:"error updating post"})
  }
  
})

//?--------------------------User API--------------------------------------

app.get("/api/user", async(req,res)=>{
  res.send(req.user)
})

app.post("/api/user/signup", async(req,res)=>{ //! is this safe? should the password be sent unencrypted over the web? how can i make it so it uses bcrypt?
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password:hashedPassword,
      isAuthor:true
    })
    await newUser.save()
    res.json({message:"Profile made successfully"}) //? MAKE SURE TO BCRYPT PASSWORD
  }catch(error){
    console.log(error)
    res.status(500).send({message:"error creating user"})
  }
})

//------------------------------- catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//-------------------------------error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;


// TODO) Fix the login issue, Add route protection 

