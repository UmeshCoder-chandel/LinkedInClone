import User from "../models/user.js";
import Notification from '../models/notification.js'

export const updateUser = async (req, res) => {
    try {
        const { user } = req.body;
        const isuser = await User.findById(req.user._id);
        if (!isuser) {
            res.status(400).json("user does not exist")
        }
        const updatedata = await User.findByIdAndUpdate(isuser._id, user)
        // console.log(updatedata);
        const userData = await User.findById(req.user._id);
        res.status(200).json({ message: "User updated successfully", user: userData })
    } catch (error) {
        res.status(400).json("some error" ,error)

    }

}

export const getAllUser=async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });

    } 
}

export const getUserbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const isUser = await User.findById({ _id: id })
        if (!isUser) {
            res.status(400).json("user not founded")
        }
        res.status(200).json({ user: isUser, message: "user founded successfully" });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });


    }
}

export const getSuggestions = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Get users who are not the current user and not in friends or pending_friends
        const suggestions = await User.find({ 
            _id: { 
                $ne: req.user._id, 
                $nin: [...user.friends, ...user.pending_friends] 
            } 
        })
        .select("name profilePic headline location")
        .limit(10);
        
        res.status(200).json({ suggestions });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};


export const findUser = async (req, res) => {
  try {
    let {  query } = req.query;
    if(!query) return res.status(400).json({message:"query is requried"})
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user?._id } },   // safe check in case req.user is undefined
        {
          $or: [
            { name: { $regex: new RegExp(`^${query}`, "i") } },
            { email: { $regex: new RegExp(`^${query}`, "i") } }
          ]
        }
      ]
    }).select("name email profilePic");
     console.log(users)
    return res.status(200).json({
      message: "fetched user",
      users: users
    });

  } catch (error) {
    console.log("FindUser Error:", error); // shows full error in server console
    res.status(502).json({
      message: "error found",
      error: error.message,   // shows error in Postman
      stack: error.stack      // optional: useful for debugging
    });
  }

};


export const sendFriendRequest = async (req, res) => {
    try {
        const sender = req.user._id;
        const { reciever } = req.body;

        const userExist = await User.findById(reciever);
        if (!userExist) {
            return res.status(400).json({
                error: "No such user exist."
            });
        };
        const index = req.user.friends.findIndex(id => id.equals(reciever));
        if (index !== -1) {
            return res.status(400).json({
                error: "already friend"
            })
        }

        const lastIndex = userExist.pending_friends.findIndex(id => id.equals(req.user._id))
        if (lastIndex !== -1) {
            return res.status(400).json({
                error: "already sent request"
            })
        }

        userExist.pending_friends.push(sender);
        let content = `${req.user.name} has sent you friend request`;
        const notification = new Notification({ sender, reciever, content, type: "friendRequest" })
        await notification.save();
        await userExist.save();
        res.status(200).json({
            message: "Friend Request Sent",
        })

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });


    }
}


export const acceptFriendRequest = async (req, res) => {
    try {
        const selfId = req.user._id;
        const { friendId } = req.body;

        const friendData = await User.findById(friendId);
        if (!friendData) {
            return res.status(400).json({
                error: "So such user exist."
            });
        };
        const index = req.user.pending_friends.findIndex(id => id.equals(friendId));
        if (index !== -1) {
            req.user.pending_friends.splice(index, 1);
        } else {
            return res.status(400).json({
                error: "no any request from such user"
            })
        }


        req.user.friends.push(friendId);
        friendData.friends.push(req.user._id);

        let content = `${req.user.name} has accepted your friend request`
        const notification = new Notification({ sender: req.user._id, reciever: friendId, content, type: 'friendRequest' })
        await notification.save();
        await friendData.save();
        await req.user.save();

        res.status(200).json({
            message: "you both are conneccted"
        })
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });


    }
}

export const removeFromFriend = async (req, res) => {
    try {
        let selfId = req.user._id;
        let { friendId } = req.params;

        const friendData = await User.findById(friendId)
        if (!friendData) {
            return res.status(400).json({
                error: "so such user exits"
            })
        }
        const index = req.user.friends.findIndex(id => id.equals(friendId))
        const friendIndex = friendData.friends.findIndex(id => id.equals(selfId))
        if (index !== -1) {
            req.user.friends.splice(index, 1);
        } else {
            return res.status(400).json({
                error: "No any request from such user"
            })
        }
        if (friendIndex !== -1) {
            friendData.friends.splice(friendIndex, 1);
        } else {
            return res.status(400).json({
                error: "No any request from such user"
            })
        }
        await req.user.save();
        await friendData.save();
        return res.status(200).json({
            message: "You both are disconnected now."
        })
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });


    }
}


export const getFriendsList = async (req, res) => {
    try {
                console.log("req.user:", req.user);

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let friendsList = await User.findById(req.user._id).populate('friends');
       console.log("friendsList:", friendsList);
        if (!friendsList) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            friends: friendsList.friends
        })

    } catch (error) {
        console.log("Error in getFriendsList:", error);
        res.status(500).json({ message: "Server error", error: error.message });

    }
}



export const getPendingFriendList = async (req, res) => {
    try {
         if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let pendingFriendsList = await User.findById(req.user._id).populate('pending_friends');
          if (!pendingFriendsList) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            friends: pendingFriendsList.pending_friends
        })

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });


    }
}

export const rejectFriendRequest = async (req, res) => {
    try {
        const { friendId } = req.params;
        const selfId = req.user._id;

        const friendData = await User.findById(friendId);
        if (!friendData) {
            return res.status(400).json({ error: "User not found" });
        }

        // Remove from pending_friends of current user
        const selfIndex = req.user.pending_friends.findIndex(id => id.equals(friendId));
        if (selfIndex !== -1) {
            req.user.pending_friends.splice(selfIndex, 1);
        }

        // Remove from pending_friends of friend
        const friendIndex = friendData.pending_friends.findIndex(id => id.equals(selfId));
        if (friendIndex !== -1) {
            friendData.pending_friends.splice(friendIndex, 1);
        }

        await req.user.save();
        await friendData.save();

        return res.status(200).json({
            message: "Friend request rejected successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};