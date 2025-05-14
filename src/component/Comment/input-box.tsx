import { memo } from "react";

const CommentInput = memo(() => {
    return(
        <>
            <form className="flex items-center">
                <input 
                type="text" name="comment" id="comment" 
                className="
                    bg-[#050515] text-white text-[14px] 
                    border-none outline-none w-[90%] min-h-[50px]
                    pl-[16px] rounded-2xl
                " 
                placeholder="Write the comment...."
                />
                <button type="submit" className="bg-[#0000ff] p-4 text-white text-[14px] font-[500] rounded-2xl">
                Comment
                </button>
            </form>
        </>
    )
});


export default CommentInput;