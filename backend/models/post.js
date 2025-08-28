// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  desc: { type: String},
  image: { type: String, default: "" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: 
     { type: Number,
      default:0 }


  
}, { timestamps: true });

const Post= mongoose.model("Post", postSchema);
export default Post;
