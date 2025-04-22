import { Post } from "../../types";

export default function PostDetail({ post }: { post : Post | undefined}) {
  return (
    <>
        <div className="flex items-center justify-center flex-col">
            <h1 className="font-[500] text-[69px] text-center">{post?.title}</h1>
            <div className="flex items-center justify-center gap-4">
                <p className="font-[500]">By AJMAL M</p>
                <p>{post?.createdAt}</p>
            </div>
            <p className="text-center max-w-[650px] leading-[26px] text-[19px]">
                {post?.description}
            </p>
        </div>
    </>
  )
}
