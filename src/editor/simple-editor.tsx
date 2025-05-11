import "../../@/styles/_variables.scss";
import "../../@/styles/_keyframe-animations.scss";

import  {SimpleEditor} from '../../@/components/tiptap-templates/simple/simple-editor';
import { Post } from "../types";


export default function SimpleEditorComponent({ content , post }: { content ?: string; post ?: Post}) {
  return (
    <>
    <SimpleEditor editorContent={ content ?? null} post={post}/>
    </>
  )
}
