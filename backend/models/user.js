
// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  GoogleId:{type:String},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // will be hashed
  profilePic: { type: String, default: "" },
  coverPic:{ type:String,default:""},
  headline: { type: String, default: "" }, // like "Full Stack Developer"
  about: { type: String, default: "" },
  location: { type: String, default: "" },
  skills: [String],
  experience: [
    {
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String
    }
  ],
  education: [
    {
      school: String,
      degree: String,
      startDate: Date,
      endDate: Date
    }
  ],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  resume:{
    type:String
  }
}, { timestamps: true });

const User= mongoose.model("User", userSchema);
export default User;