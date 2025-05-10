import { NavLink, useLocation } from "react-router";

const AuthNavbar = () => {
  const location = useLocation();
  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center gap-4">
          {
            location.pathname.includes("/auth/sign-up") && (
              <NavLink 
                to={'/auth/login'}
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              >
                  Login
              </NavLink>
            )
          }
          {
            location.pathname.includes("/auth/login") && (
              <NavLink 
                to={'/auth/sign-up'}
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              >
                  Sign Up
              </NavLink>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
