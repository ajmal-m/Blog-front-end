import {  useEffect, useRef } from "react"
import Loader from "../../component/Loader";
import PostCard from "../../component/PostCard";
import './index.css';
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootStore } from "../../store";
import {  updatePage } from "../../store/postSlice";
import { fetchPosts } from "../../store/postSlice";
import { Post } from "../../types/post";

export default function Posts() {

    const {posts, currentPage, limit, nextPage , loading} = useSelector((state: RootStore) => state.post);
    const dispatch = useDispatch<AppDispatch>();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const theme = useSelector((state : RootStore) => state.theme.theme);

    const scrollFetchDatas = async () => {
        if(!loading){
            dispatch(updatePage({page: currentPage+1}))
            dispatch(fetchPosts({ page: currentPage + 1, limit}))
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
            dispatch(fetchPosts({ page : currentPage, limit}))
        }
    }, []);

    return (
        <>
            <div ref={scrollRef} className={`min-h-[calc(100vh-73px)] overflow-y-scroll ${theme === 'dark' ? 'bg-[black]' : 'bg-[white]'}`}  onScroll={handleScroll} >
                {
                    loading ? (
                        <Loader/>
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
                            <div className={`h-screen w-screen flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                Empty 
                            </div>
                        )
                    )
                }
                
            </div>
        </>
  )
}
