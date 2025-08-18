

const addPost=async(req,res)=>{
    try {
        const {text,image}=req.body
        const  userid=req.user._id;
        
    } catch (error) {
        res.status(500).json("some erroe in post add")
    }

}


export default {addPost}