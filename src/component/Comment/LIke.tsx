import { memo, useCallback, useEffect, useRef, useState } from "react";
import { formatNumberShort } from "../../lib/utils";
import { CommentType } from "../../types/comment";
import { createCommentLike, deleteCommentLike } from "../../api";

const Like = memo(({ comment, postId }: { comment : CommentType, postId : string;}) => {

    const [likeCount, setLikeCount] = useState<number>(0);
    const [likedStatus, setLikedStatus] = useState<boolean>(false);

    const debouncerTimer = useRef<NodeJS.Timeout | null>(null);
    const updateLikes = useCallback(async() => {

        if(debouncerTimer.current) clearTimeout(debouncerTimer.current);
        debouncerTimer.current = setTimeout( async () => {
            const currentLIkeCount = likedStatus ? Math.max(0, likeCount-1) : likeCount + 1;
            const currentLikedStatus = ! likedStatus;
            setLikeCount( _ => currentLIkeCount  );
            setLikedStatus( _ =>  currentLikedStatus);
            let data;
            if(currentLikedStatus){
                // Do Like
                data = await createCommentLike({
                    postId,
                    commentId: comment._id
                });
                console.log(data);
            }else{
                // Do UnLIke
                data = await deleteCommentLike({
                    postId,
                    commentId: comment._id
                });
                console.log(data);
            }
        }, 500)
    },[comment, postId, likeCount, likedStatus]);


    useEffect(() => {
        setLikeCount(comment.likes.length || 0);
        setLikedStatus(comment.hasLiked)
    }, [])
    return(
        <>
            <svg onClick={updateLikes} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={`${likedStatus ? '#8ec5ff' :'none'}`} 
            stroke="#8ec5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            className="lucide lucide-thumbs-up-icon lucide-thumbs-up cursor-pointer">
            <path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>
            </svg>
            <span className="text-[12px]">
                {
                    formatNumberShort(likeCount)
                }
            </span>
        </>
    )
});

export default Like;