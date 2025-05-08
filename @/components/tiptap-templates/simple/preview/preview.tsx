"use client";
import {Button} from '../../../tiptap-ui-primitive/button';
import { useTiptapEditor } from "../../../../hooks/use-tiptap-editor";
import {createHtmlPost} from '../../../../../src/api/index'
import { useAuth } from '../../../../../src/hooks/authContext';

export default function Preview() {

    const editor = useTiptapEditor();
    const {user} = useAuth();
    const getHTMLcontent = () => {
        console.log(editor?.getHTML());
        console.log(editor?.getJSON())
    }

    const publishPost = async () => {
      const {data} = await createHtmlPost({
        htmlContent: JSON.stringify(editor?.getHTML()),
        htmlObject: editor?.getJSON(),
        authorId: user?.id
      });
      console.log("Data ", data)
    }
  return (
    <>
        <Button    onClick={getHTMLcontent}
        data-style="ghost" className='cursor-pointer'>
            Preview
        </Button>

        <Button    onClick={publishPost}
        data-style="ghost" className='cursor-pointer'>
            Publish
        </Button>
    </>
  )
}
