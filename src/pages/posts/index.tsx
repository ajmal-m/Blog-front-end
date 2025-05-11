import {  useEffect, useRef, useState } from "react"
import { getPosts } from "../../api";
import Loader from "../../component/Loader";
import { Post } from "../../types";
import PostCard from "../../component/PostCard";
import { UseTheme } from "../../hooks/themeContext";
import './index.css'

export default function Posts() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(false);
    const [limit] = useState(10);
    const {theme} = UseTheme();
    const scrollRef = useRef<HTMLDivElement | null>(null);


    const scrollFetchDatas = async () => {
        const data = await getPosts({ page, limit});
        setPosts(x => [...x, ...(data?.posts || [])]);
        setNextPage(data?.nextPage);
    };

    const handleScroll = () => {
        const div = scrollRef.current;
        if(!div) return null;
        if (div.scrollTop + div.clientHeight >= div.scrollHeight ) {
            // Reached at bottom
            if(nextPage){
                setPage((page) => page+1)
                scrollFetchDatas();
            }
        }
    }

    useEffect(() => {
        const fetchPosts = async() => {
            setLoading(true);
            const data = await getPosts({ page, limit});
            setNextPage(data?.nextPage);
            setPage((p) => p+1)
            setPosts(data?.posts);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    return (
        <>
            <div ref={scrollRef} className={`min-h-[calc(100vh-73px)] overflow-y-scroll ${theme === 'dark' ? 'bg-[black]' : 'bg-[white]'}`}  onScroll={handleScroll} >
                {
                    !loading && posts.length ? (
                        <div className="grid-post-container">
                            {  
                               posts.map((item: Post) => (
                                    <PostCard post={item} key={item._id}/>
                                ))
                            }
                        </div>
                    ) : loading && !posts.length ? (
                        <Loader/>
                    ):(
                        <div className={`h-screen w-screen flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            Empty
                        </div>
                    )
                }
                
            </div>
        </>
  )
}
