import Notification from "../models/notification.model.js";



export  const getAllNotifications=async(req,res)=>{
    try {
        const userId=req.user._id;
        const notifications=await Notification.find({ to: userId }).populate({                 //eg:When someone follows the user, the system would typically create a notification indicating that the user has gained a new follower.
            path: "from",
			select: "username profileImg",
        })

        await Notification.updateMany({ to: userId }, { read: true });

		res.status(200).json(notifications);
     
        
    } catch (error) {
        console.log("Error in getNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}