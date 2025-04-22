import { useParams } from "react-router";
import { getPostById } from "../../api";
import Loader from "../../component/Loader";
import { useEffect, useState } from "react";
import {ToastContainer, toast} from 'react-toastify';
import { Post } from "../../types";

export default function PostDetail() {
    const {postId} = useParams();
    const [post, setPost] = useState<Post>();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getPosts = async () => {
            const data = await getPostById({ id: postId});
            if(! data.success){
                toast(`Error : ${data?.message}`);
                // Redirect Into 404
                return
            }
            setPost(data.post);
            setLoading(false);
        };
        getPosts();
    }, [])
    return (
        <>
        {
            loading ? (
                <Loader/>
            ) : (
                <div>
                    <h1>Post detail</h1>
                    <h2>{post?.title}</h2>
                    <h2>{post?.description}</h2>
                </div>
            )
        }
        <ToastContainer />
        </>
    )
}
