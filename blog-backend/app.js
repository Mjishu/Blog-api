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

const indexRouter = require('./routes/index');
const blogRouter = require("./routes/blogs");
const User = require("./models/user")

const app = express();

// -------------------------------view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: process.env.SESSIONSECRET, resave:false,saveUninitialized:false, store: MongoStore.create({mongoUrl: process.env.MONGOAPI})}));
app.use(passport.initialize())
app.use(passport.session());
app.use(express.urlencoded({extended:false}));

app.use('/', blogRouter);
// app.use("/blog", blogRouter)

//*-------------------MongoDB Connection---------------------------------
mongoose.set("strictQuery", "false")
const mongoDB  = process.env.MONGOAPI

main().catch((err) => console.log(err));
async function main(){
  await mongoose.connect(mongoDB)
}

//?-------------------------Authentication-------------------------------------------
//! Not staying logged in when i move between links, Should this be in userController on sign-in POST?
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
      console.log(user) //! Finds the user but doesnt log in?? or does it log in for a second and then log out 
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

app.post("/log-in", passport.authenticate("local", {
  successRedirect:"/",
  failureRedirect:"/"
}))

app.get("/log-out", (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    console.log("loggin out")
    res.redirect("/")
  })
})


app.get("/api", (req,res) =>{ //?  I should just be able to get the data from the mongo DB
  res.send("hello from back here")
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