import { useNavigate, useParams } from "react-router";
import SimpleEditorComponent from "../../editor/simple-editor";
import { useEffect, useState } from "react";
import { getPostById} from '../../api/index';
import {ToastContainer, toast} from 'react-toastify';
import { Post } from "../../types";
import Loader from "../../component/Loader";
import { useSelector } from "react-redux";
import { RootStore } from "../../store";

export default function EditPost(){
    const {postId } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post>();
    const user = useSelector((state: RootStore) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async ()=> {
            setLoading(true);
            const data = await getPostById({ id: postId});
            if(! data.success){
                setLoading(false);
                toast(`Error : ${data?.message}`);
                // Redirect Into Home
                navigate("/")
                return
            }
            // Check owner of post is same authenticated user
            if(data?.post?.author?._id !== user?.id){
                navigate("/");
                return
            }
            setPost(data.post);
            setLoading(false);
        }

        getPost();
    }, [postId]);


    return (
        <>
        {
            loading ? (
                <Loader/>
            ) : (
                <SimpleEditorComponent content={JSON.parse(post?.htmlContent || "")} post={post}/>
            )
        }
        <ToastContainer />
        </>
    )
}