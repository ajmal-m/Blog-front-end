import { useCallback, useEffect, useState } from "react"
import { Post } from "../types"
import { createPost, UpdatePost } from "../api";
import { toast, ToastContainer} from 'react-toastify';
import { useNavigate } from "react-router";

type PropType = {
  post?:Post,
  type:'create' | 'update'
}

function PostCreateForm({type, post}: PropType) {
  const [postData, setPostData] = useState<Post>({ title:'', description:''});
  const navigate = useNavigate();

  const submitForm = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    let response;
    if( type ===  'create'){
      response = await createPost({ postData});
    }else if( type === 'update'){
      response = await UpdatePost({postData, postId: post?._id});
    }

    if(response.success){
      toast.success(`${response.message}`);
      navigate('/')
    }else{
      toast.error(`${response.message}`);
    }
  }, [postData])

  useEffect(() => {
    if(post){
      setPostData({...post});
    };
  }, [])

  return (
    <>
    <form className="w-[500px] p-[16px] bg-[red] rounded bg-[#223266] dark:bg-[#223266]" onSubmit={submitForm}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input type="text" name="title" id="title"  className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
          border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, [e.target.name]: e.target.value})}
      />
      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
      <textarea 
        id="description" 
        name="description"
        className="
          block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
          border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write post details..."
          value={postData.description}
          onChange={(e) => setPostData({ ...postData, [e.target.name]: e.target.value})}
      >
      </textarea>
      <button 
        type="submit" 
        className="
          text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
          py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
          focus:outline-none dark:focus:ring-blue-800 cursor-pointer
          mt-6
        "
      >
        {
          type === 'update' ? 'Update' :'Create'
        }
      </button>
    </form>
    <ToastContainer/>
  </>
  )
}

export default PostCreateForm