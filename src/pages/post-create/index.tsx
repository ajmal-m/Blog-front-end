// import { Editor } from "../../editor";
// import PostCreateForm from "../../component/post-create-form";
// import Navbar from "../../component/Editor/Navbar";
import SimpleEditorComponent from "../../editor/simple-editor";

function PostCreate() {
  return (
    <>
        <div className="flex flex-col h-screen">
            {/* <Navbar/> */}
            {/* <Editor/> */}
            {/* <PostCreateForm type="create"/> */}
            <SimpleEditorComponent/>
        </div>
    </>
  )
}

export default PostCreate