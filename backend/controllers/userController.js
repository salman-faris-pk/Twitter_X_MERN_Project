import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";






 export const UserProfile=async(req,res)=>{
      
    const {username}=req.params;

    try {
        const user=await User.findOne({username:username}).select("-password")
        if (!user) return res.status(404).json({
             message: "User not found" 
            });

        return res.status(200).json(user);

    } catch (error) {
        console.log("Error in getUserProfile: ", error.message);
		res.status(500).json({ 
            error: error.message
         });
    }
};



export const followUnfollow=async(req,res)=>{
    try {
        const { id } = req.params;
		const Otheruser = await User.findById(id);
		const loginedUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()){
            return res.status(400).json({
                 error: "You can't follow/unfollow yourself" 
                });
        }
        if (!Otheruser || !loginedUser){ 
            return res.status(400).json({ 
            error: "User not found"
         });
        }
      
        const isFollowing= loginedUser.following.includes(id)

        if(isFollowing){ 
            //unfollow

            await User.findByIdAndUpdate(id,{$pull:{ followers: req.user._id }});  //remove logined users userid from otherusers followers field
            await User.findByIdAndUpdate(req.user._id,{$pull: { following: id }});  //remove otherusers id from logined users following field

            res.status(200).json({
                 message: "User unfollowed successfully" 
                });

        }else{
            //follow

            await User.findByIdAndUpdate(id,{$push:{ followers:req.user._id }});
            await User.findByIdAndUpdate(req.user._id,{$push:{ following: id }});
           

              const newNotification= new Notification({
                 types:"follow",
                 from: req.user._id,
                 to: Otheruser._id,
              });

              await newNotification.save();

              res.status(200).json({
                 status:"success",
                 message: "User followed successfully" 
                });

        }
        
    } catch (error) {
        console.log("Error in followUnfollowUser: ", error.message);
		res.status(500).json({ error: error.message });
    }
};



export const userSuggestions=async(req,res)=>{
    try {
        const userId=req.user._id;
        const usersFllowedByMe=await User.findById(userId).select("following")
        
    } catch (error) {
        console.log("Error in SuggestedUsers: ", error.message);
		res.status(500).json({
             error: error.message 
            });
    }
};