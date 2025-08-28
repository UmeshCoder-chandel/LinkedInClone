import Comment from "../models/comment.js";
import Notification from "../models/notification.js";
import Post from "../models/post.js";

export const commentPost=async (req,res) => {
    try {
        const {postId,comment}=req.body;
        const userId=req.user._id
        const postExist=await Post.findById(postId).populate("user");
        if(!postExist){
            return res.status(400).json({error:"no such post found"})
        }
        postExist.comments=postExist.comments+1;
        await postExist.save();

        const newComment =new Comment({user:userId,post:postId,comment:comment})
        await newComment.save();

        const populateComment=await Comment.findById(newComment._id).populate("user","name headline profilePic")

        const content= `${req.user.name} has comment on your post `
        const notication=new Notification({sender:userId,reciever:postExist.user._id,content,type:"comment",post:postId.toString()})
       await notication.save();
       return res.status(200).json({
        message:"commented successfully"
        ,comment:populateComment
       })
    } catch (error) {
        res.status(500).json("server error",error)
    }
    
}

export const getCommentbyPostId=async(req,res)=>{
    try {
          const {postId}=req.params;
          const isPostExist=await Post.findById(postId)
          console.log(isPostExist);
          
          if(!isPostExist){
            return res.status(404).json("not founde post")
          }
          const comment= await Comment.find({post:postId}).sort({createdAt:-1}).populate("user","name headline profilePic")
            res.status(200).json({
            message:"comment fetched",
            comments:comment
          })

    } catch (error) {
        res.status(500).json("server error",error)
    }
}