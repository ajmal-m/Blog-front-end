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
import {  fetchPostCOmments, incrementPage } from "../../store/commentSlice";

const  Comment =  memo(({ postId, count }: { postId: string; count: number;}) => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { comments, currentPage, limit, nextPage, loading , showMoreLoader} = useSelector((state: RootStore) => state.comment);

    console.log("comment render")

    const openCommentModal = useCallback(() => {
      setOpenModal(true);
      dispatch(fetchPostCOmments({ page: currentPage, limit, postId}))
    }, [ postId, limit, currentPage]);


    const loadMoreComments = useCallback(async () => {
      if(nextPage){
        dispatch(incrementPage());
        dispatch(fetchPostCOmments({ page: currentPage+1, postId, limit}))
      }
    }, [currentPage, limit, postId, nextPage]);


    const closeModal = useCallback(( ) => {
      setOpenModal(false);
    }, [openModal ])

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
              <div className="h-[60vh] overflow-y-auto">
                {
                  loading  ? (<Loader/>) : (
                    comments.length ? (
                      <>
                        {
                          comments.map((comment:any) => (
                             <CommentBox 
                                comment={comment}
                                key={comment.id}
                              />
                          ))
                        }
                        {
                          nextPage && (
                            <div className="w-full flex items-center justify-center my-2">
                              <button onClick={loadMoreComments} className="bg-[blue] w-[200px] h-[24px] text-white text-[14px] font-[500] rounded-2xl cursor-pointer">
                                {
                                  showMoreLoader ? (
                                    "Loading..."
                                  ) : "LoadMore"
                                }
                              </button>
                            </div>
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
                <CommentInput
                  postId={postId}
                />
              </div>
            </div>
          </Modal>
        </>
    )
});

export default Comment;