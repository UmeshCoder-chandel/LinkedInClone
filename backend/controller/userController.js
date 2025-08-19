import User from "../models/user.js";


export const updateUser=async (req,res) => {
    try {
        
        const {user} =req.body;
        const isuser=await User.findById(req.user._id);
        if(!isuser){
            res.status(400).json("user does not exist")
        }
        const updatedata=await User.findByIdAndUpdate(isuser._id,user)
        
        const userData=await User.findById(req.user._id);
        res.status(200).json("User updated successfully",userData)
    } catch (error) {
            res.status(400).json("some error") 
        
    }
    
}

export const getUserbyId=async (req,res) => {
    try {
        const {name}=req.params;
        const isUser=await User.findOne({name}).select("-password");
        if(!isUser){
            res.status(400).json("user not founded")
        }
        res.status(200).json(isUser);
    } catch (error) {
            res.status(500).json("some error") 
        
    }
} 

 export const getSuggestions=async (req,res) => {
    try {
        const user=await User.findById(req.user._id).select("connections");
        const suggestions=await User.find({_id:{$ne:req.user._id,$nin:user.connections}}).select("name,profilePic,headline").limit(5);
        res.status(200).json(suggestions);
    } catch (error) {
            res.status(500).json("some error") 
        
    }
    
};
