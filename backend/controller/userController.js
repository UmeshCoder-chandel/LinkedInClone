import User from "../models/user";


const updateUser=async (req,res) => {
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

const getUserbyId=async (req,res) => {
    try {
        const {id}=req.params;
        const isUser=await User.findById(id);
        if(!isUser){
            res.status(400).json("user not founded")
        }
        
    } catch (error) {
            res.status(500).json("some error") 
        
    }
}

export default {updateUser,getUserbyId}