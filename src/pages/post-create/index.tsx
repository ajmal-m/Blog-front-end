// import { Editor } from "../../editor";
import PostCreateForm from "../../component/post-create-form";
import Navbar from "../../component/Editor/Navbar";

function PostCreate() {
  return (
    <>
        <div className="flex flex-col h-screen">
            <Navbar/>
            {/* <Editor/> */}
            <PostCreateForm type="create"/>
        </div>
    </>
  )
}

export default PostCreate