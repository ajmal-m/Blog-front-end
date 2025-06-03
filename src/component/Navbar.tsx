import { NavLink, useLocation } from "react-router";
import { DrawerMenu } from "./Drawer";
import {ThemeToggle} from '../../@/components/tiptap-templates/simple/theme-toggle'

import {useSelector, useDispatch} from 'react-redux';
import { toggleTheme } from "../store/themeSlice";
import { RootStore } from "../store";
import { Profile } from "./Dropdown/Profile";
import { GlobalSearch } from "./reusable/global-search";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  const theme = useSelector((state : RootStore) => state.theme.theme);



  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600">
      <div className="flex flex-wrap items-center justify-between p-4">
          {
            location.pathname === '/' && (
              <div className="hidden md:flex">
                <GlobalSearch/>
              </div>
            )
          }
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="flex items-center">
              <NavLink 
                to={'/'}
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              >
                  Home
              </NavLink>
            </li>
            <li  className="flex items-center">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <NavLink 
                    to={'/editor/new'}
                  >
                      Create
                  </NavLink>
              </button>
            </li>
           {
            !location.pathname.includes("/post/") && (
              <li>
                <button 
                  onClick={ () => dispatch(toggleTheme())} type="button" 
                  className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 
                  focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 
                  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  { theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              </li>
            )
           }
           <li>
            <Profile/>
           </li>
          </ul>
        </div>
        <div className="hidden max-sm:flex">
          <DrawerMenu/>
        </div>
        <div>
            {location.pathname.includes("/post/") && (
              <ThemeToggle/>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
