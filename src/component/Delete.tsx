import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useCallback, useState } from "react";

export default function Delete({ id, method, text} : { id: string | undefined; method:any, text: string}){
    const [openModal, setOpenModal] = useState(false);


    const handleAction = useCallback(async () => {
        const data = await method({ id });
        if(data?.success){
            setOpenModal(false)
            window.location.reload();
        }else{
            alert(`${data?.message}`);
        }
    }, [ method, id])
    return(<>
        <p onClick={() => setOpenModal(true)} className="text-[14px] font-[500]">Delete</p>
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <ModalHeader />
            <ModalBody>
            <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {text}
                </h3>
                <div className="flex justify-center gap-4">
                <Button  
                    className="
                        inline-flex items-center px-3 py-2 
                        text-sm font-medium text-center text-white bg-blue-700 
                        rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
                        dark:focus:ring-blue-800 cursor-pointer
                    "  
                    onClick={() =>handleAction() }>
                    {"Yes, I'm sure"}
                </Button>
                <Button 
                    onClick={() => setOpenModal(false)}  
                    className="cursor-pointer"
                >
                    No, cancel
                </Button>
                </div>
            </div>
            </ModalBody>
        </Modal>
    </>)
}