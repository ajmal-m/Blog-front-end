
"use client";

import {  Drawer, DrawerItems } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { logOutUser } from "../store/userSlice";
import { toggleTheme } from "../store/themeSlice";
import { RootStore } from "../store";

export function DrawerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state : RootStore) => state.user);
  const theme = useSelector((state : RootStore) => state.theme.theme);

  const handleClose = () => setIsOpen(false);

  const handleLogout = () => {
    setIsOpen(false)
    dispatch(logOutUser());
    navigate('/auth/login');
  }

  return (
    <>
      <div className="flexitems-center justify-center">
        <svg onClick={() => setIsOpen(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu-icon lucide-menu cursor-pointer">
          <path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/>
        </svg>
      </div>
      <Drawer open={isOpen} onClose={handleClose} className="transition-all duration-300 ease-in-out bg-[red]">
        <DrawerItems>
          <div className="flex flex-col gap-4">
             <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                { user ? user.name : 'Guest'}
              </button>
               {
            !location.pathname.includes("/post/") && (
                <button onClick={ () =>{ dispatch(toggleTheme()); setIsOpen(false); }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  { theme === 'dark' ? 'Light' : 'Dark'}
                </button>
            )
           }
              <hr />
            <NavLink 
              to={'/'}
              onClick={() => setIsOpen(false)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Home
            </NavLink>


            <NavLink 
                to={'/editor/new'}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                  Create
            </NavLink>

             <button type="button" onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Logout
              </button>
          </div>
        </DrawerItems>
      </Drawer>
    </>
  );
}
