import { useEffect, useState } from "react"
import { getPosts } from "../../api";
import Loader from "../../component/Loader";
import { Post } from "../../types";
import PostCard from "../../component/PostCard";
import { UseTheme } from "../../hooks/themeContext";

export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {theme} = UseTheme();

    useEffect(() => {
        const fetchPosts = async() => {
            setLoading(true);
            const data = await getPosts();
            setPosts(data?.posts)
            setLoading(false);
        }

        fetchPosts();
    }, []);
    return (
        <>
            <div className={`grid grid-cols-4 gap-4 flex-wrap overflow-y-auto h-auto p-[16px] ${theme === 'dark' ? 'bg-[black]' : 'bg-[white]'}`} >
                {
                    !loading && posts.length ? (
                        posts.map((item: Post) => (
                           <PostCard post={item} key={item._id}/>
                        ))
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
