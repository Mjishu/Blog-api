const mongoose = require("mongoose")
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{type:String, required:true},
    password: {type:String, required:true},
    isAuthor:{type:Boolean},
    date:{type:Date, default:Date.now}
})

UserSchema.virtual("url").get(function(){
    return `/user/${this._id}`
})

module.exports = mongoose.model("User", UserSchema)