import { memo, useState } from "react";
import {CommentType} from '../../types/comment';
import CommentActions from "./comment-actions";

const CommentBox = memo(({ comment , postId }: { comment: CommentType ; postId: string;}) => {
    const [showMore, setShowMore] = useState(false);
    return(
        <>
            <div className="w-full p-[16px] bg-[#03072e] text-[14px] font-[500] text-white min-h-[10px] rounded-[16px] mt-[8px]">
                {
                    showMore ? (
                        <div>
                            <p className="text-[#7e7e8f] text-[14px] max-sm:text-[12px] font-[500]" style={{wordWrap:'break-word'}}>{comment.text}</p>
                            {"      "}
                            {
                                showMore && <button onClick={() => setShowMore(false)} className="cursor-pointer text-[#7c7785] font-[400]">Show Less</button>
                            }
                        </div>
                    ) : (
                        <div>
                            <p className="text-[14px] text-[#7e7e8f] max-sm:text-[12px] font-[500]" style={{wordWrap:'break-word'}}>{comment.text.slice(0,100)}</p>
                            {
                                comment.text.length > comment.text.slice(0,100).length && (<span className="text-[#7c7785] font-[400]">. . . . </span>)
                            }
                            {
                                comment.text.length > comment.text.slice(0,100).length && (
                                    <button onClick={() => setShowMore(true)} className="cursor-pointer text-[#7c7785] font-[400]">Show More</button>
                                )
                            }
                        </div>
                    )
                }
                <CommentActions
                    comment={comment}
                    postId={postId}
                />
            </div>
        </>
    )
});

export default CommentBox;