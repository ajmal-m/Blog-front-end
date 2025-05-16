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
                <CommentActions
                    comment={comment}
                    postId={postId}
                />
            </div>
        </>
    )
});

export default CommentBox;