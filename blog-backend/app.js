const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const mongoose = require("mongoose")
// ?-------------Authentication imports--------------------------
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const indexRouter = require('./routes/index');
const blogRouter = require("./routes/blogs");
const User = require("./models/user")

const app = express();

// -------------------------------view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: process.env.SESSIONSECRET, resave:false,saveUninitialized:true }));
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

app.post("/log-in", passport.authenticate("local", {
  successRedirect:"/",
  failureRedirect:"/"
}))

app.get("/log-out", (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    res.redirect("/")
  })
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
