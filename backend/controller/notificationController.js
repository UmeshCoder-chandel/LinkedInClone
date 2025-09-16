import Notification from "../models/notification.js";

// Get my notifications
export const getNotifications = async (req, res) => {
  try {
    
    const userId=req.user._id;
        const notifications = await Notification.find({ reciever: req.user._id }).populate("sender", "name profilePic")
            .sort({ createdAt: -1 })

        res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const {notificationId}=req.body;
    const notification = await Notification.findByIdAndUpdate(notificationId,{isRead:true});

    if (!notification) return res.status(404).json({ message: "Not found" });
   
  
    await notification.save();

    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) return res.status(404).json({ message: "Not found" });
    if (notification.reciever.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await notification.deleteOne();
    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const activeNotify=async(req,res)=>{
  try {
        let owrId=req.body?._id
        let notification=await Notification.find({reciever:owrId,isRead:false})
        return res.status(200).json({
          message:"notication number fetched ",
          count:notification.length
        })
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
}