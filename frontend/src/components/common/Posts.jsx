import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({feedType}) => {

	const getPostsUrls=()=>{
		switch(feedType){
			case "forYou" :
				return "/api/posts/AllPosts";
			
			case "following":
				return "/api/posts/followingPosts";
			
			default:
				return "/api/posts/AllPosts";	

		}
	}

	const POST_URLS= getPostsUrls();

	const {data : posts, isLoading,refetch,isRefetching}=useQuery({
		queryKey : ["posts"],
		queryFn : async()=>{
			try {
               const response=await fetch(POST_URLS)
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
	 },[feedType,refetch])


	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
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