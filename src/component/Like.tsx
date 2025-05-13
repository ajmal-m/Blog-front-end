import { formatNumberShort } from "../lib/utils";
import {memo, useEffect, useRef, useState} from 'react';
import '../styles/Like.css';

const Like = memo(
    ({ filled, color = 'blue', likeCount = 0 }: {
    filled: boolean;
    color ?: string;
    likeCount ?: number;
}) => {

    const [likeStatus, setLikeStatus] = useState<boolean>(false);
    const iconRef = useRef<SVGSVGElement | null>(null);

    const updateLike = () => {
        const iconItem = iconRef.current;
        if(!iconItem) return null;
        iconItem.classList.toggle('scale-clicked');
        setLikeStatus((status) => ! status);
    };

    useEffect(() => {
        setLikeStatus(filled);
    }, [])
    return (
        <>
        <div className="flex items-center font-bold text-white">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" 
                fill={`${likeStatus ? color : 'none'}`} stroke="white" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round" 
                className="lucide lucide-heart-icon lucide-heart cursor-pointer"
                onClick={updateLike}
                ref={iconRef}
            >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            {formatNumberShort(likeCount)}
        </div>
        </>
    )
}
);

export default Like;