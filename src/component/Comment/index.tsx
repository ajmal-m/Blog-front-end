import { Modal} from "flowbite-react";
import { useState } from "react";
import CommentBox from "./comment-box";
import Close from "./close";
import CommentInput from "./input-box";
// import Loader from "../Comment/loader";

export default function Comment(){
    const [openModal, setOpenModal] = useState(false);

    return(
        <>
          <svg xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" viewBox="0 0 24 24" 
              fill="blue" stroke="white" stroke-width="2" 
              stroke-linecap="round" stroke-linejoin="round" 
              className="lucide lucide-message-square-text-icon lucide-message-square-text cursor-pointer"
              onClick={() => setOpenModal(true)}
          >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M13 8H7"/><path d="M17 12H7"/>
          </svg>
          <Modal 
            show={openModal} 
            onClose={() => setOpenModal(false)} 
          >
            <div className="min-h-[90vh] w-full bg-[#1e2939] rounded-[8px] p-[16px]">

              {/* Title and close */}
              <div className="flex items-center justify-between border-b border-gray-700 pb-[16px]">
                <h1 className="text-[22px] text-white font-[500]">Comments</h1>
                <Close method={() => setOpenModal(false)}/>
              </div>

              {/* Comment section */}
              <div className="h-[70vh] overflow-y-auto">
                {
                  [...new Array(3).fill(0).map((_) => (
                    <CommentBox 
                      text="HI How are you?"
                    />
                  ))]
                }
                {/* <Loader/> */}
              </div>

              {/* Text Input update */}
              <div>
                <CommentInput/>
              </div>
            </div>
          </Modal>
        </>
    )
}