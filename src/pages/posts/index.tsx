import {  useEffect, useRef } from "react"
import Loader from "../../component/Loader";
import PostCard from "../../component/PostCard";
import './index.css';
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootStore } from "../../store";
import {  clearPosts, updatePage } from "../../store/postSlice";
import { fetchPosts } from "../../store/postSlice";
import { Post } from "../../types/post";
import { useSearchParams } from "react-router";

export default function Posts() {
    const [params] = useSearchParams();
    const {posts, currentPage, limit, nextPage , loading} = useSelector((state: RootStore) => state.post);
    const dispatch = useDispatch<AppDispatch>();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const theme = useSelector((state : RootStore) => state.theme.theme);

    const scrollFetchDatas = async () => {
        if(!loading){
            dispatch(updatePage({page: currentPage+1}))
            dispatch(fetchPosts({ page: currentPage + 1, limit, q : params.get("search") || ""}))
        }
    };

    const handleScroll = () => {
        const div = scrollRef.current;
        if(!div) return null;
        if (div.scrollTop + div.clientHeight >= div.scrollHeight ) {
            // Reached at bottom
            if(nextPage && !loading){
                scrollFetchDatas();
            }
        }
    }

    useEffect(() => {
        if(nextPage && currentPage === 1){
            dispatch(fetchPosts({ page : currentPage, limit, q : params.get("search") || ""}))
        }
    }, []);

    useEffect(() => {
        if( params.get("search") ){
            dispatch(clearPosts());
            dispatch(fetchPosts({ page : 1, limit, q : params.get("search") || ""}))
        }
    }, [params])

    return (
        <>
            <div ref={scrollRef} className={`min-h-[calc(100vh-73px)] overflow-y-scroll ${theme === 'dark' ? 'bg-[black]' : 'bg-[white]'}`}  onScroll={handleScroll} >
                {
                    loading ? (
                        <div className="mt-[24px]">
                            <Loader/>
                        </div>
            
                    ) : (
                        posts.length ? (
                            <>
                                <div className="grid-post-container">
                                    {  
                                        posts.map((item: Post) => (
                                            <PostCard post={item} key={item._id}/>
                                        ))
                                    }
                                </div>
                                {
                                    nextPage && (
                                        <div className="flex items-center justify-center text-white animate-bounce">
                                            Loading...
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            <div className={`flex items-center justify-center mt-[24px] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                               <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" 
                                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" 
                                className="lucide lucide-circle-off-icon lucide-circle-off"
                               >
                               <path d="m2 2 20 20"/><path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"/><path d="M19.08 19.08A10 10 0 1 1 4.92 4.92"/>
                               </svg> 
                            </div>
                        )
                    )
                }
                
            </div>
        </>
  )
}
