
import { memo } from "react";
import { useNavigate } from "react-router";

const ReadMore = memo(({postId}:{postId: string | undefined}) => {
    const naivigate = useNavigate();
    return(
        <>
            <div 
                className="
                    flex items-center gap-1 flex-row-reverse 
                    cursor-pointer text-[14px] font-[500] text-white 
                    leading-[10px] hover:text-[#666cde]
                "
                onClick={() => {
                    if(!postId) return;
                    naivigate(`/post/${postId}`);
                } }
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right">
                <path d="m9 18 6-6-6-6"/>
                </svg>
                More
            </div>
        </>
    )
})

export default ReadMore;