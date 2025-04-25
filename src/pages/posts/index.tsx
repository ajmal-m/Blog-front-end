import { useEffect, useState } from "react"
import { getPosts } from "../../api";
import Loader from "../../component/Loader";
import { Post } from "../../types";
import PostCard from "../../component/PostCard";

export default function Posts() {

    const [posts, setPosts] = useState([]);

    console.log("Posts")

    useEffect(() => {
        const fetchPosts = async() => {
            const data = await getPosts();
            setPosts(data?.posts)
        }

        fetchPosts();
    }, []);
    return (
        <>
            <div className="grid grid-cols-4 gap-4 flex-wrap overflow-y-auto h-auto p-[16px]">
                {
                    posts.length ? (
                        posts.map((item: Post) => (
                           <PostCard post={item} key={item._id}/>
                        ))
                    ) : (
                        <Loader/>
                    )
                }
                
            </div>
        </>
  )
}
