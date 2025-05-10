import "../../@/styles/_variables.scss";
import "../../@/styles/_keyframe-animations.scss";

import  {SimpleEditor} from '../../@/components/tiptap-templates/simple/simple-editor';


export default function SimpleEditorComponent({ content }: { content ?: string}) {
  return (
    <>
    <SimpleEditor editorContent={ content ?? null}/>
    </>
  )
}
