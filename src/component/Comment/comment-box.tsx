import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store";

const CommentBox = memo(({ comment }: { comment: { text: string; userId : string; postId: string;}}) => {
    const [showMore, setShowMore] = useState(false);
    const user = useSelector((state: RootStore) => state.user);
    return(
        <>
            <div className="w-full p-[16px] bg-[#03072e] text-[14px] font-[500] text-white min-h-[10px] rounded-[16px] mt-[8px]">
                {
                    showMore ? (
                        <div>
                            <p style={{wordWrap:'break-word'}}>{comment.text}</p>
                            {"      "}
                            {
                                showMore && <button onClick={() => setShowMore(false)}>Show Less</button>
                            }
                        </div>
                    ) : (
                        <div>
                            <p  style={{wordWrap:'break-word'}}>{comment.text.slice(0,100)}</p>
                            {
                                comment.text.length > comment.text.slice(0,100).length && ' ....'
                            }
                            {
                                comment.text.length > comment.text.slice(0,100).length && (
                                    <button onClick={() => setShowMore(true)}>Show More</button>
                                )
                            }
                        </div>
                    )
                }
                <div className="flex justify-between items-center mt-[6px]">
                    <div>
                        <p className="text-[12px] text-blue-300">4 hour ago</p>
                    </div>
                    <div className="flex items-center gap-[4px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" 
                        stroke="#8ec5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        className="lucide lucide-thumbs-up-icon lucide-thumbs-up cursor-pointer">
                        <path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>
                        </svg>
                        {
                            user.id === comment.userId && (
                                <p className="text-[12px] text-blue-300 cursor-pointer">Delete</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
});

export default CommentBox;