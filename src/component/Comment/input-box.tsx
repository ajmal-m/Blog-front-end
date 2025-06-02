import { memo, useCallback, useState } from "react";
import { createPostComment } from "../../api";
import { toast, ToastContainer} from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store";
import { clearComments, fetchPostCOmments } from "../../store/commentSlice";

const CommentInput = memo(({ postId }: { postId : string;}) => {
    const [text, setText] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const [commentLoader, setLoader] = useState(false);
    const {limit} = useSelector((state: RootStore) => state.comment);

    const addComment = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if(!text) return;
        setLoader(true);
        const data = await createPostComment({postId, text});
        setLoader(false);
        if(!data?.success){
            toast.error(`${data.message}`);
            return
        }else{
            setText("");
            dispatch(clearComments());
            dispatch(fetchPostCOmments({ page:1, limit, postId}));
        }
    }, [text])
    return(
        <>
            <form className="flex items-center" onSubmit={addComment}>
                <input 
                    type="text" name="comment" id="comment" 
                    className="
                        bg-[#050515] text-white text-[14px] 
                        border-none outline-none w-[90%] min-h-[50px]
                        pl-[16px] rounded-2xl
                    " 
                    placeholder="Write the comment...."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <button type="submit" className="bg-[#0000ff] p-4 text-white text-[14px] font-[500] rounded-2xl cursor-pointer w-[100px]" disabled={commentLoader}>
                    {
                         commentLoader ? "Adding.." : "Comment"
                    }
                </button>
            </form>
            <ToastContainer/>
        </>
    )
});


export default CommentInput;