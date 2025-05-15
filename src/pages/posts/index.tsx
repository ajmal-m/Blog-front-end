import {  useEffect, useRef, useState } from "react"
import Loader from "../../component/Loader";
import { Post } from "../../types";
import PostCard from "../../component/PostCard";
import './index.css';
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootStore } from "../../store";
import { updateNextPage, updatePage, updatePosts } from "../../store/postSlice";
import { getPosts } from "../../api";

export default function Posts() {

    const {posts, currentPage, limit, nextPage} = useSelector((state: RootStore) => state.post);
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const theme = useSelector((state : RootStore) => state.theme.theme)


    const scrollFetchDatas = async () => {
        const data = await getPosts({ page : currentPage, limit});
        dispatch(updatePosts({posts: data?.posts || []}));
        dispatch(updateNextPage({ nextPage: data?.nextPage}));
    };

    const handleScroll = () => {
        const div = scrollRef.current;
        if(!div) return null;
        if (div.scrollTop + div.clientHeight >= div.scrollHeight ) {
            // Reached at bottom
            if(nextPage){
                dispatch(updatePage({page: currentPage+1}))
                scrollFetchDatas();
            }
        }
    }

    useEffect(() => {
        const fetchPosts = async() => {
            setLoading(true);
            if(nextPage){
                const data = await getPosts({ page : currentPage, limit});
                dispatch(updateNextPage({ nextPage: data?.nextPage}));
                dispatch(updatePage({page: currentPage+1}));
                dispatch(updatePosts({posts:data?.posts||[]}))
            }
            setLoading(false);
        }

        fetchPosts();
    }, []);

    return (
        <>
            <div ref={scrollRef} className={`min-h-[calc(100vh-73px)] overflow-y-scroll ${theme === 'dark' ? 'bg-[black]' : 'bg-[white]'}`}  onScroll={handleScroll} >
                {
                    loading ? (
                        <Loader/>
                    ) : (
                        posts.length ? (
                            <div className="grid-post-container">
                                {  
                                    posts.map((item: Post) => (
                                        <PostCard post={item} key={item._id}/>
                                    ))
                                }
                            </div>
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
