
"use client";

import {  Drawer, DrawerItems } from "flowbite-react";
import { useState } from "react";

export function DrawerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flexitems-center justify-center">
        <svg onClick={() => setIsOpen(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu-icon lucide-menu cursor-pointer">
          <path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/>
        </svg>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerItems>

        </DrawerItems>
      </Drawer>
    </>
  );
}
