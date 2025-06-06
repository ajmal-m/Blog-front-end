import { Modal} from "flowbite-react";
import { useCallback, useState } from "react";
import CommentBox from "./comment-box";
import Close from "./close";
import CommentInput from "./input-box";
import Loader from "../Comment/loader";
import { memo } from "react";
import Empty from "./empty";
import { formatNumberShort } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store";
import {  clearComments, fetchPostCOmments } from "../../store/commentSlice";
import { CommentType } from "../../types/comment";
import ShowMoreButton from "./show-more";
import './index.css';

const  Comment =  memo(({ postId, count }: { postId: string; count: number;}) => {
    const [openModal, setOpenModal] = useState(false);
    const [showCommentInput, setCommentInput] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { comments, currentPage, limit, nextPage, loading } = useSelector((state: RootStore) => state.comment);

    const openCommentModal = useCallback(() => {
      setOpenModal(true);
      dispatch(clearComments());
      dispatch(fetchPostCOmments({ page: 1, limit, postId}))
    }, [ postId, limit, currentPage]);


    const closeModal = useCallback(( ) => {
      setCommentInput(false);
      setOpenModal(false);
    }, [openModal, showCommentInput ])

    return(
        <>
          <svg xmlns="http://www.w3.org/2000/svg" 
              width="16" height="16" viewBox="0 0 24 24" 
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
            onClose={closeModal} 
          >
            <div className="min-h-[80vh] w-full bg-[#1e2939] rounded-[8px] p-[16px]">

              {/* Title and close */}
              <div className="flex items-center justify-between border-b border-gray-700 pb-[16px]">
                <h1 className="text-[22px] text-white font-[500]">Comments</h1>
                <Close method={closeModal}/>
              </div>

              {/* Comment section */}
              <div className="h-[60vh] overflow-y-auto pr-1" id="scrollable-container">
                {
                  loading  ? (<Loader/>) : (
                    comments.length ? (
                      <>
                        {
                          comments.map((comment: CommentType) => (
                             <CommentBox 
                                comment={comment}
                                key={comment._id}
                                postId={postId}
                              />
                          ))
                        }
                        {
                          nextPage && (
                          <ShowMoreButton
                            postId={postId}
                          />
                          )
                        }
                      </>
                    ) : (
                      <Empty
                          text="No comments yet."
                      />
                    )
                  )
                }
              </div>

              {/* Text Input update */}
              <div>
                {
                  !showCommentInput && (
                    <button
                      className="bg-[#0000ff] w-full text-white text-[16px] font-[500] py-[4px] mt-[9px]"
                      onClick={() => setCommentInput(true)}
                    >
                      Add Comment
                    </button>
                  )
                }
                {
                  showCommentInput && (
                    <CommentInput
                      postId={postId}
                    />
                  )
                }
              </div>
            </div>
          </Modal>
        </>
    )
});

export default Comment;