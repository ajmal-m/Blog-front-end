import { memo, useState } from "react";

const CommentBox = memo(({ text }: { text: string;}) => {
    const [showMore, setShowMore] = useState(false);
    return(
        <>
            <div className="w-full p-[16px] bg-[#03072e] text-[14px] font-[500] text-white min-h-[10px] rounded-[16px] mt-[8px]">
                {
                    showMore ? (
                        <div>
                            <p style={{wordWrap:'break-word'}}>{text}</p>
                            {"      "}
                            {
                                showMore && <button onClick={() => setShowMore(false)}>Show Less</button>
                            }
                        </div>
                    ) : (
                        <div>
                            <p  style={{wordWrap:'break-word'}}>{text.slice(0,100)}</p>
                            {
                                text.length > text.slice(0,100).length && ' ....'
                            }
                            {
                                text.length > text.slice(0,100).length && (
                                    <button onClick={() => setShowMore(true)}>Show More</button>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
});

export default CommentBox;