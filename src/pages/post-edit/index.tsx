import { useNavigate, useParams } from "react-router";
import SimpleEditorComponent from "../../editor/simple-editor";
import { useEffect, useState } from "react";
import { getPostById} from '../../api/index';
import {ToastContainer, toast} from 'react-toastify';
import { Post } from "../../types";
import Loader from "../../component/Loader";

export default function EditPost(){
    const {postId } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post>();
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async ()=> {
            setLoading(true);
            const data = await getPostById({ id: postId});
            if(! data.success){
                setLoading(false);
                toast(`Error : ${data?.message}`);
                // Redirect Into 404
                navigate("/")
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
                <SimpleEditorComponent content={JSON.parse(post?.htmlContent||"")}/>
            )
        }
        <ToastContainer />
        </>
    )
}