import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { UseEditor } from "../../hooks/editorContext";
import parse from 'html-react-parser';

import "reactjs-tiptap-editor/style.css";

import 'reactjs-tiptap-editor/style.css'
import 'prism-code-editor-lightweight/layout.css';
import "prism-code-editor-lightweight/themes/github-dark.css"

import 'katex/dist/katex.min.css'
import 'easydrawer/styles.css';


export function Component() {
  const [openModal, setOpenModal] = useState(false);
  const {content} = UseEditor();

  return (
    <>
      <Button className="cursor-pointer bg-[black] rounded text-[white] px-[8px] py-[4px] text-[12px] font-[500] m-1 border-none outline-none"  
        onClick={() => setOpenModal(true)}>Preview</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)} className="w-full">
        <ModalHeader>Terms of Service</ModalHeader>
        <ModalBody>
          {parse(content)}
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
