import { Post } from "../types";
import Like from "./Like";
import Comment from "./Comment";
import PostCardDropDown from "./Dropdown/PostCard";
import ReadMore from "./ReadMore";

export default function PostCard({ post }: {post : Post}) {
  return (
   <>
    <div className="min-w-[10px] h-[200px] p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col relative">
            <div className="flex items-center justify-end">
                <PostCardDropDown postId={post._id}/>
            </div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-active-color h-[96px] overflow-hidden">
                {post.title}
            </h5>
            <div className="flex items-center gap-1 mt-[12px] justify-between">
                <div className="flex items-center gap-[6px]">
                    <Like 
                        liked={post?.hasLiked ? true : false} 
                        color="blue" 
                        likeCount={post?.likeCount||0}
                        postId={post._id}
                    />
                    <Comment/>
                </div>
                <div>
                   <ReadMore postId={post._id}/>
                </div>
            </div>
        </div>
    </div>
   </>
  )
}
