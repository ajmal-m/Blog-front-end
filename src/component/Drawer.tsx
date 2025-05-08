
"use client";

import { Button, Drawer, DrawerItems } from "flowbite-react";
import { useState } from "react";

export function DrawerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flexitems-center justify-center">
        <Button className="cursor-pointer bg-[red]" onClick={() => setIsOpen(true)}>Show drawer</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerItems>

        </DrawerItems>
      </Drawer>
    </>
  );
}
