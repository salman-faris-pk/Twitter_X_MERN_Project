import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import cloudinary from "cloudinary";






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



export const Suggestionusers=async(req,res)=>{
    try {
        const userId=req.user._id;
        const usersFllowedByMe=await User.findById(userId).select("following")

        const users = await User.aggregate([
			{
				$match: {
					_id: { $ne: userId },
				},
			},
			{ $sample: { size: 10 } },           //It randomly selects a specified number of documents from the input.
		]);

        const filteredUsers= users.filter((user)=> !usersFllowedByMe.following.includes(user._id))  //it filters the users that the logineduser not following,which means not following users are the suggest users.
        const suggestionUsers=filteredUsers.slice(0,6)
        // console.log(suggestionUsers);

         suggestionUsers.forEach((user)=>(user.password=null))

         res.status(200).json(suggestionUsers);


    } catch (error) {
        console.log("Error in SuggestedUsers: ", error.message);
		res.status(500).json({
             error: error.message 
            });
    }
};


export const updateUser=async(req,res)=>{

    const {fullName,email,username,currentPassword,newPassword,Bio,link}=req.body;
    let { profileImg,coverImg }=req.body;
    //   console.log(profileImg);
    //   console.log(coverImg);

    const userId=req.user._id;

    try {
      let user=await User.findById(userId)
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }

      if( (!newPassword && currentPassword ) || (!currentPassword && newPassword) ){
        return res.status(400).json({ 
            error: "Please provide both current password and new password" 
        });
      }

     if(currentPassword && newPassword){
        const isMatch= await bcrypt.compare(currentPassword,user.password)
        if(!isMatch){
            return res.status(400).json({ error: "Current password is incorrect" });
        }
        if(newPassword.length < 6){
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        user.password=await bcrypt.hash(newPassword,10)

     }
    
     if(profileImg){
        if(user.profileImg){        //if user already have a profile image and we can destroy it from cloudinary accound using destroy
            
            await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
        }
        const uploadedResponse =  await cloudinary.uploader.upload(profileImg,{ folder: 'Twitter-clone-images' });
          profileImg=uploadedResponse.secure_url;
     }
    
     if(coverImg){
        if(user.coverImg){
            await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(coverImg,{ folder: 'Twitter-clone-images' });
			 coverImg = uploadedResponse.secure_url;
             
     }

        user.fullName= fullName || user.fullName
        user.email = email || user.email;
		user.username = username || user.username;
		user.Bio = Bio || user.Bio;
		user.link = link || user.link;
		user.profileImg = profileImg || user.profileImg;
		user.coverImg = coverImg || user.coverImg;

      await user.save();
      user.password = null;

      return res.status(200).json(user);

        
    } catch (error) {
        console.log("Error in updateUser: ", error.message);
		res.status(500).json({ error: error.message });
    }
}