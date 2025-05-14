import { Dropdown, DropdownItem } from "flowbite-react";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { memo } from "react";
import Delete from "../Delete";
import { deletePost } from "../../api";

const PostCardDropDown = memo(({postId}: { postId : string | undefined}) => {
  const navigate = useNavigate();

  const editPost = useCallback(() => {
    navigate(`/editor/${postId}`)
  }, [postId]);


  return (
    <Dropdown  
        dismissOnClick={false} 
        renderTrigger={() => 
            <svg 
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                viewBox="0 0 24 24" fill="none" stroke="#a2c1f9" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ellipsis-icon lucide-ellipsis cursor-pointer"
            >
                    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
        }
    >
      <div>
        <DropdownItem className="text-[14px] font-[500]" onClick={editPost}>Edit</DropdownItem>
        <DropdownItem className="text-[14px] font-[500]">
          <Delete method={deletePost} id={postId} text="Are you sure you want to delete this post?"/>
        </DropdownItem>
      </div>
    </Dropdown>
  );
});

export default PostCardDropDown;