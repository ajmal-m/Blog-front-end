import { Post } from "../types/post";
import Like from "./Like";
import Comment from "./Comment";
import PostCardDropDown from "./Dropdown/PostCard";
import ReadMore from "./ReadMore";
import { useSelector } from "react-redux";
import { RootStore } from "../store";
import { getTimeToNow } from "../lib/utils";
import { Avatar } from "flowbite-react";


export default function PostCard({ post }: {post : Post}) {

    const user = useSelector((state: RootStore) => state.user);
    return (
        <>
            <div className="min-w-[10px] h-[215px] p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col relative">
                    <div className="flex items-center justify-between min-h-[24px]">
                        <div className="flex gap-2 items-center">
                            {
                                post.author?.avatar ? (
                                    <Avatar img={post.author.avatar ?? ""} rounded  />
                                ):(
                                    <Avatar placeholderInitials={post?.author?.name ?? ""} rounded  />
                                )
                            }
                            <p className="text-[12px] font-[500] text-[#8891ff] capitalize">
                                {
                                   post?.creadtedAt ? getTimeToNow(post.creadtedAt) : post.createdAt ? getTimeToNow(post.createdAt) : "" 
                                }
                            </p>
                        </div>
                        {
                            (post.author?._id === user?.id ) && (
                                <PostCardDropDown postId={post._id}/>
                            )
                        }
                    </div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#c1c1c1] h-[96px] overflow-hidden mt-2">
                        {post.title}
                    </h5>
                    <div className="flex items-center gap-1 mt-[12px] justify-between">
                        <div className="flex items-center gap-[6px]">
                            <Like 
                                liked={post?.hasLiked ? true : false} 
                                color="#8ec5ff" 
                                likeCount={post?.likeCount||0}
                                postId={post._id}
                            />
                            <Comment postId={post?._id ||''} count={post.comments?.length||0}/>
                        </div>
                        <div>
                        <ReadMore postId={post?._id}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
