import Notification from "../models/notification.js";
import Post from "../models/post.js";
import cloudinary from "../config/cloudinary.js";


const createPost=async(req,res)=>{
    try {
        const {desc,image}=req.body;
        let userId=req.user._id
        
        // Validate post content
        if (!desc?.trim() && !image) {
            return res.status(400).json({message: "Post must contain text or image"});
        }
        
        // Check for duplicate posts (same content within last 5 minutes)
        const recentPosts = await Post.find({
            user: userId,
            createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
        });
        
        const isDuplicate = recentPosts.some(post => 
            post.desc === desc && post.image === image
        );
        
        if (isDuplicate) {
            return res.status(400).json({message: "You've already posted this content recently"});
        }
        
        const addPost=new Post({user:userId,desc: desc?.trim(),image})
        if(!addPost){
            return res.status(400).json({message: "Error creating post"});
        }
        await addPost.save();
        
        // Populate user data before sending response
        await addPost.populate("user", 'name profilePic headline');
        
        res.status(201).json({message:"post created successfully",post:addPost});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "some error in post add"})
    }

}

const getfeedPost=async (req,res) => {
    try {
        const post=await Post.find().sort({createdAt:-1}).populate("user",'name profilePic headline');
        res.status(200).json(post);
        console.log(post)
    } catch (error) {
        console.log(error);
        
        res.status(500).json("some error in fetching posts");
    }
}

const getPostById=async (req,res) => {
   try {
       const postId=req.params.id;
       const post=await Post.findById(postId).populate("user",'name profilePic headline')
    //    .populate("comments.user","name profilePicture headline");
       if(!post){
               console.log("Post not found:", postId);
           return res.status(404).json("post not found");
       }    
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
            return res.status(404).json({message: "post not found"});
        }
        if(post.user.toString()!==userId.toString()){
            return res.status(403).json({message: "you are not authorized to delete"})
        }
        if (post.image) {
            try {
                // Extract public_id from a URL like:
                // https://res.cloudinary.com/<cloud>/image/upload/v12345/folder/name.ext
                const urlParts = post.image.split("/");
                const fileWithExt = urlParts[urlParts.length - 1];
                const publicId = fileWithExt.substring(0, fileWithExt.lastIndexOf("."));
                await cloudinary.uploader.destroy(publicId);
            } catch (e) {
                // Continue even if image deletion fails
                console.error("Cloudinary destroy failed:", e?.message || e);
            }
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({message: "post deleted successfully"})
    }catch (error) {
        console.error("Delete post error:", error);
        res.status(500).json({message: "some error in deleting post"});
    }
}

const createComment=async (req,res) => {
    try {
        const postId=req.params.id;
        const {text}=req.body;
        const post=await Post.findByIdAndUpdate(postId,{
            $push:{comments:{user:req.user._id,text}}
        },{new:true}).populate("author","name profilePic headline");
         
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
        const userId=req.user._id;
        const {postId}=req.body;
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json("post not found");
        }
        const index=post.likes.findIndex(id=>id.equals(userId));
        if(index!==-1){
            post.likes.splice(index,1);
        }else{
            post.likes.push(userId);
        }
        // await post.save();
          
        // if(post.author.toString()!==userId.toString()){
        //     const newNotification=new Notification({
        //          user:post.author,
        //         sender:req.user._id,
        //         post:postId,
        //         type:"like"
        //     });
        //     await newNotification.save();
        // }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json("some error in liking post");
    }
    
}


const getTop5PostForUser=async (req,res) => {
    try {
        const {userId}=req.params;
        const posts= await Post.find({user:userId}).sort({createdAt:-1}).populate("user").limit(5);
        res.status(200).json({
            message:"fetched Data",
            posts:posts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error",error})   
    }
    
}

const getAllPostForUser=async(req,res)=>{
    try {
        const {userId}=req.params;
        const posts= await Post.find({user:userId}).sort({createdAt:-1}).populate("user");
        res.status(200).json({
            message:"fetched Data",
            posts:posts
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error",error})   
        
    }
}
export  {createPost,getfeedPost,getPostById,deletePost,createComment,LikePost,getTop5PostForUser,getAllPostForUser}