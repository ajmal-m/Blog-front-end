import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store";
import { CommentType } from "../../types/comment";
import { getTimeToNow } from "../../lib/utils";
import { deletePostComment } from "../../api";
import { clearComments, fetchPostCOmments } from "../../store/commentSlice";

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
    }, [confirmDelete])
    return(
        <>
        <div className="flex justify-between items-center mt-[6px]">
            <div>
                <p className="text-[12px] text-blue-300">{ getTimeToNow(comment.createdAt)}</p>
            </div>
            <div className="flex items-center gap-[4px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" 
                stroke="#8ec5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                className="lucide lucide-thumbs-up-icon lucide-thumbs-up cursor-pointer">
                <path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>
                </svg>
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