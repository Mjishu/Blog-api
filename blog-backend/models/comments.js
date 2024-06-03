const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CommentsSchema = new Schema({ //! The post element isnt showing up in the DB
    title:{type:String, required:true},
    description:{type:String, required:true},
    username:{type:String, required:true},
    date:{type:Date, default:Date.now},
    post:{type:Schema.Types.ObjectId, ref:"Posts"}
})

CommentsSchema.virtual("url").get(function(){
    return `/post/${this,post}/comments/${this._id}`
})

module.exports = mongoose.model("Comments", CommentsSchema)