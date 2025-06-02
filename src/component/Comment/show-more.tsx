import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store";
import { fetchPostCOmments, incrementPage } from "../../store/commentSlice";

const ShowMoreButton = memo(({ postId }: { postId : string;}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {showMoreLoader, nextPage, currentPage, limit} = useSelector((state: RootStore ) => state.comment);


    const loadMoreComments = useCallback(async () => {
        if(nextPage){
          dispatch(incrementPage());
          dispatch(fetchPostCOmments({ page: currentPage+1, postId, limit}))
        }
      }, [currentPage, limit, postId, nextPage]);
        return(
            <>
            <div className="w-full flex items-center justify-center my-2">
                <button onClick={loadMoreComments} className="bg-[blue] w-[200px] h-[24px] text-white text-[14px] font-[500] rounded-2xl cursor-pointer">
                {
                    showMoreLoader ? (
                    "Loading..."
                    ) : "LoadMore"
                }
                </button>
            </div>
            </>
        )
});


export default ShowMoreButton;