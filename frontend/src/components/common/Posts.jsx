import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { backendUrl } from "../../utils/backendurl"

const Posts = ({feedType,username,userId}) => {

	const getPostsUrls=()=>{
		switch(feedType){
			case "forYou" :
				return `${backendUrl}/api/posts/AllPosts`;
			
			case "following":
				return `${backendUrl}/api/posts/followingPosts`;

			case "posts" :
				return `${backendUrl}/api/posts/userspost/${username}`
			case "likes":
				return `${backendUrl}/api/posts/like/${userId}`
			
			default:
				return `${backendUrl}/api/posts/AllPosts`;	

		}
	}

	const POST_URLS= getPostsUrls();

	const {data : posts, isLoading,refetch,isRefetching}=useQuery({
		queryKey : ["posts"],       
		queryFn : async()=>{
			try {
               const response=await fetch(POST_URLS,{credentials:"include"})
			   const data= await response.json();

			   if(!response.ok){
				throw new Error(data.Error || "Something went wrong")
			   }
               
			   return data;
				
			} catch (error) {
				throw new Error(error)
			}
		}
	})

	 useEffect(()=>{
         refetch();
	 },[feedType,refetch,username])


	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>
				No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching &&  posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;