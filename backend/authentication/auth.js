import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const auth = async (req,res,next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({
                message: "No token access"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded){
            return res.status(401).json("invalid token")
        }
         const user = await User.findById(decoded.userId).select('-password')
       if(!user){
        return res.status(400).json("user not found")
       }
       req.user=user;
         next();
                  

    } catch (error) {
        console.log("auth.js page",error);
        
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
    
}

export default auth;