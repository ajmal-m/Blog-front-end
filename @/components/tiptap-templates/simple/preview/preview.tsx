"use client";
import {Button} from '../../../tiptap-ui-primitive/button';
import { useTiptapEditor } from "../../../../hooks/use-tiptap-editor";
import {createHtmlPost, UpdatePost} from '../../../../../src/api/index'
import { useAuth } from '../../../../../src/hooks/authContext';
import { useNavigate } from 'react-router';
import { Post } from '../../../../../src/types';

export default function Preview({
  post
}: { post : Post | undefined}) {

    const editor = useTiptapEditor();
    const {user} = useAuth();
    const navigate = useNavigate();
    const getHTMLcontent = () => {
        console.log(editor?.getHTML());
        console.log(editor?.getJSON())
    }

    const publishPost = async () => {
      // Creating new post
      if(!post){
          const data = await createHtmlPost({
            htmlContent: JSON.stringify(editor?.getHTML()),
            htmlObject: editor?.getJSON(),
            authorId: user?.id
          });
          if(!data?.success){
            alert(`${data.message}`);
            return;
          }
          navigate("/")
      }else{
        // Editing exist post
        const data = await UpdatePost({postId: post._id, htmlContent: JSON.stringify(editor?.getHTML() || ""), htmlObject: editor?.getJSON() });
        if(!data?.success){
          alert(`${data?.message}`);
          return;
        }
        navigate("/");
      }
    }
  return (
    <>
        <Button    onClick={getHTMLcontent}
        data-style="ghost" className='cursor-pointer'>
            Preview
        </Button>

        <Button    onClick={publishPost}
        data-style="ghost" className='cursor-pointer'>
            {
             post ? "Edit" : "Publish"
            }
        </Button>
    </>
  )
}
