import Conversation from '../models/conversation.js'
import Message from '../models/message.js'


export const AddChat=async (req,res) => {
    try {
        let senderId=req.user._id;
        let {recieverId,message}=req.body;
        let conversation=await Conversation.findOne({
            members:{
                $all:[senderId,recieverId]
            }
        })
        if(!conversation){
            let newConversation=new Conversation({
                members:[senderId,recieverId]
            })
            await newConversation.save();
            let addMessage=new Message({
                sender:req.user._id,
                conversation:newConversation._id,
                message
            })
            await addMessage.save();
        }else{
            let addMessage=new Message({
                sender:req.user._id,
                conversation:conversation._id,
                message
            })
            await addMessage.save();
        }
        res.status(200).json({message:"message sent successfully"})


    } catch (error) {
        res.status(500).json({message:"server error",error})
    }
}


export const getChats = async (req,res) => {
try {
    let userId=req.user._id;
    let conversations=await Conversation.find({
        members:{$in:[userId]}
    }).populate("members","-password").sort({updatedAt:-1})
    return res.status(200).json({
        message:"fetched successfully",
        conversations:conversations
    })

} catch (error) {
    res.status(500).json({message:"server error",error})
}    
}