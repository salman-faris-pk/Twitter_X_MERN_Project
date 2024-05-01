import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import Post from "../models/post.model.js"
import Notification from "../models/notification.model.js";




export const createPost=async(req,res)=>{
    try {
        const {text}=req.body;
        let {img}=req.body;
        const userId=req.user._id.toString();
        
         const user= await User.findById(userId)
         if (!user) return res.status(404).json({ message: "User not found" });

         if (!text && !img) {
			return res.status(400).json({ error: "Post must have text or image" });
		}

        if(img){
            const uploadResponse= await cloudinary.uploader.upload(img)
                img=uploadResponse.secure_url;
        }

        const newPost = new Post({
			user: userId,
			text,
			img,
		});

		await newPost.save();
		res.status(201).json(newPost);


    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
		console.log("Error in createPost controller: ", error);
    }
}


export const DeletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		if (post.user.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "You are not authorized to delete this post" });
		}

		if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		console.log("Error in deletePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const CommentPost=async(req,res)=>{
    try {

        const {text}=req.body;
        if(!text){
            return res.status(400).json({ error: "Text field is required" });
        }
        
        const postId=req.params.id;
        const userId=req.user._id;

        const post=await Post.findById(postId)
        if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

        const comment= {
            user:userId,
            text
        }

        post.comments.push(comment)
        await post.save();

        res.status(200).json(post);
        

    } catch (error) {

        console.log("Error in commentOnPost controller: ", error);
		res.status(500).json({ error: "Internal server error" });   
    }
}

export const LikeunLikePost=async(req,res)=>{
    try {
        
        const {id: postId}=req.params;     //same as const postId = req.params.id;
        const userId=req.user._id;

        const post=await Post.findById(postId)
        if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

        const userLikes=post.likes.includes(userId)

        if(userLikes){
            //unlikepost
            await Post.updateOne({_id: postId},{ $pull: {likes: userId}});
            await User.updateOne({_id: userId},{ $pull: {likedPosts: postId}});

            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
			res.status(200).json(updatedLikes);

        }else{
            //like post
            post.likes.push(userId);
            await User.updateOne({_id: userId},{ $push:{likedPosts: postId}})
            await post.save();

            const notification=new Notification({
                from:userId,
                to:post.user,
                types:"like"
            })

            await notification.save();
          
            const updatedLikes=post.likes;
            res.status(200).json(updatedLikes)

        }
        
    } catch (error) {
        console.log("Error in likeUnlikePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
}