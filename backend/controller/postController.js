import Notification from "../models/notification.js";
import Post from "../models/post.js";


const createPost=async(req,res)=>{
    try {
        const {text,image}=req.body
        let newPost;
        if(image){
            const imgResult=await cloudinary.uploader.upload(image)
            newPost=new Post({
                author:req.user._id,
                text,
                image:imgResult.secure_url
            })
        }else{
            newPost=new Post({
                author:req.user._id,
                text
            })
        }
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json("some error in post add")
    }

}

const getfeedPost=async (req,res) => {
    try {
        const post=await Post.find({author:{$in:[...req.user.connections,req.user._id]}}).populate("author","name","profilePicture").populate("comments.author","name","profilePicture").sort({createdAt:-1});
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json("some error in fetching posts");
    }
}

const getPostById=async (req,res) => {
   try {
       const postId=req.params.id;
       const post=await Post.findById(postId).populate("author",'name profilePicture headline')
       .populate("comments.user","name profilePicture headline");
       res.status(200).json(post)
   } catch (error) {
       res.status(500).json("some error in fetching post");
   }
}



const deletePost=async (req,res) => {
    try{
        const postId=req.params.id;
        const userId=req.user._id
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json("post not found");
        }
        if(post.author.toString()!==userId.toString()){
            return res.status(403).json("you are not authorized to delete")
        }
        if(post.image){
            await cloudinary.uploader.destory(post.image.split('/').pop().split(".")[0])
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json("post deleted successfully")
    }catch (error) {
        res.status(500).json("some error in deleting post");
    }
}

const createComment=async (req,res) => {
    try {
        const postId=req.params.id;
        const {text}=req.body;
        const post=await Post.findByIdAndUpdate(postId,{
            $push:{comments:{user:req.user._id,text}}
        },{new:true}).populate("author","name profilePicture headline");
         
        if(post.author._id.toString()!==req.user._id.toString()){
            const newNoti=new Notification({
                user:post.author,
                sender:req.user._id,
                post:postId,
                type:"comment"
            })
        }
        await newNoti.save();
        try {
            const postUrl=process.env.BASE_URL + "/post/" + postId;
            await sendNotification(newNoti);
        } catch (error) {
            console.error("Error saving notification:", error);
        }



    } catch (error) {
        res.status(500).json("some error in adding comment");
    }
}

const LikePost=async (req,res) => {
    try {
        const postId=req.params.id;
        const post=await Post.findById(postId);
        const userId=req.user._id;
        if(post.likes.includes(userId)){
            post.likes=post.likes.filter(id=>id.toString()!==userId.toString());
        }else{
            post.likes.push(userId);

        }
        if(post.author.toString()!==userId.toString()){
            const newNotification=new Notification({
                 user:post.author,
                sender:req.user._id,
                post:postId,
                type:"like"
            });
            await newNotification.save();
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        
    }
    
}


export  {createPost,getfeedPost,getPostById,deletePost,createComment,LikePost}