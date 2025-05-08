"use client";
import {Button} from '../../../tiptap-ui-primitive/button';
import { useTiptapEditor } from "../../../../hooks/use-tiptap-editor";

export default function Preview() {

    const editor = useTiptapEditor();
    const getHTMLcontent = () => {
        console.log(editor?.getHTML());
        console.log(editor?.getJSON())
    }
  return (
    <>
        <Button    onClick={getHTMLcontent}
        data-style="ghost" className='cursor-pointer'>
            Preview
        </Button>

        <Button    onClick={getHTMLcontent}
        data-style="ghost" className='cursor-pointer'>
            Publish
        </Button>
    </>
  )
}
