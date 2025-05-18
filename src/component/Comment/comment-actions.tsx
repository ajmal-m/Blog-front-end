import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store";
import { CommentType } from "../../types/comment";
import { getTimeToNow } from "../../lib/utils";
import { deletePostComment } from "../../api";
import { clearComments, fetchPostCOmments } from "../../store/commentSlice";
import Like from "./LIke";

const CommentActions = memo(({ comment , postId }: { comment : CommentType ; postId : string;}) => {
    const {id} = useSelector((state : RootStore) => state.user);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { limit} = useSelector((state : RootStore) => state.comment);

    const deleteComment = useCallback(async () => {
        if(!confirmDelete){
            setConfirmDelete(true);
            return;
        }
        // Delete
        const reponse = await deletePostComment({ commentId : comment._id , postId});
        if(reponse.success){
            dispatch(clearComments());
            dispatch(fetchPostCOmments({page :1 , limit, postId}))
        }
    }, [confirmDelete]);

    return(
        <>
        <div className="flex justify-between items-center mt-[6px]">
            <div>
                <p className="text-[12px] text-blue-300">{ getTimeToNow(comment.createdAt)}</p>
            </div>
            <div className="flex items-center gap-[4px]">
                <Like 
                    comment={comment}  
                    postId={postId}
                />
                {
                    id === comment.userId && (
                        <p className={`text-[12px] cursor-pointer ${confirmDelete ? "text-red-500" :"text-blue-300"}`} onClick={deleteComment}>
                            {
                                confirmDelete ? "Confirm" :"Delete"
                            }
                        </p>
                    )
                }
            </div>
        </div>
        </>
    )
});

export default CommentActions;