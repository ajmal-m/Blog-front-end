import { Editor } from "../../editor";
import Navbar from "../../component/Editor/Navbar";

function PostCreate() {
  return (
    <>
        <div className="flex flex-col h-screen">
            <Navbar/>
            <Editor/>
        </div>
    </>
  )
}

export default PostCreate