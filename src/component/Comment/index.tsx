import { Modal} from "flowbite-react";
import { useCallback, useState } from "react";
import CommentBox from "./comment-box";
import Close from "./close";
import CommentInput from "./input-box";
import Loader from "../Comment/loader";
import { getPostComments } from "../../api";
import { memo } from "react";
import Empty from "./empty";
import { formatNumberShort } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store";
import { clearComments, updateComments } from "../../store/commentSlice";

const  Comment =  memo(({ postId, count }: { postId: string; count: number;}) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector((state: RootStore) => state.comment.comments);


    const getComments = useCallback(async () => {
      const data = await getPostComments({postId});
      dispatch(updateComments({ comments: data?.comments}));
      setLoading(false);
    }, [ comments,loading]);


    const openCommentModal = useCallback(() => {
      dispatch(clearComments());
      setLoading(true);
      setOpenModal(true);
      getComments();
    }, [comments, loading]);

    return(
        <>
          <svg xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" viewBox="0 0 24 24" 
              fill="blue" stroke="white" stroke-width="2" 
              stroke-linecap="round" stroke-linejoin="round" 
              className="lucide lucide-message-square-text-icon lucide-message-square-text cursor-pointer"
              onClick={openCommentModal}
          >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M13 8H7"/><path d="M17 12H7"/>
          </svg>
          <p className="font-bold text-white">{formatNumberShort(count)}</p>
          <Modal 
            show={openModal} 
            onClose={() => setOpenModal(false)} 
          >
            <div className="min-h-[80vh] w-full bg-[#1e2939] rounded-[8px] p-[16px]">

              {/* Title and close */}
              <div className="flex items-center justify-between border-b border-gray-700 pb-[16px]">
                <h1 className="text-[22px] text-white font-[500]">Comments</h1>
                <Close method={() => setOpenModal(false)}/>
              </div>

              {/* Comment section */}
              <div className="h-[60vh] overflow-y-auto">
                {
                  loading  ? (<Loader/>) : (comments.length ? comments.map((comment : any) => (
                    <CommentBox 
                      text={comment.text}
                    />
                  )):(
                   <Empty
                      text="No comments yet."
                   />
                  ))
                }
              </div>

              {/* Text Input update */}
              <div>
                <CommentInput
                  postId={postId}
                  getComments={getComments}
                />
              </div>
            </div>
          </Modal>
        </>
    )
});

export default Comment;