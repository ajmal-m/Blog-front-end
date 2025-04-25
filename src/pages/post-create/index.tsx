import PostCreateForm from "../../component/post-create-form";

function PostCreate() {
  return (
    <>
        <div className="flex items-center justify-center mt-[24px]">
            <PostCreateForm
                type="create"
            />
        </div>
    </>
  )
}

export default PostCreate