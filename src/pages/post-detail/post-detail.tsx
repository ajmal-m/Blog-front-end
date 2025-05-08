import { Post } from "../../types";
import { SimpleEditor } from "../../../@/components/tiptap-templates/simple/simple-editor";

export default function PostDetail({ post }: { post : Post | undefined}) {
  return (
    <>
      <SimpleEditor viewOnly={true} editorContent={ JSON.parse(post?.htmlContent || "")}/>
    </>
  )
}
