const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    image: {type:String},
    user:{type:Schema.Types.ObjectId, ref:"User"},
    date: {type:String},
    title:{type:String, required:true, minLength:3},
    body:{type:String},
    description: {type:String},
    isPublished: {type:Boolean},
})

PostSchema.virtual("url").get(function () {
    return `/posts/${this._id}`
})

module.exports = mongoose.model("Posts", PostSchema)