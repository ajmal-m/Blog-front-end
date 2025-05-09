import { Outlet, useNavigate } from "react-router";
import Navbar from "../component/Navbar";
import { useAuth } from "../hooks/authContext";
import { useEffect } from "react";


export default function MainLayout() {
  const { user} = useAuth();
  const navigate = useNavigate();

  console.log("Main Layout");


  useEffect(() => {
    if(! user?.loggedIn){
      navigate("/auth/login")
    }
  }, []);
  
  return (
    <>
      {
        user?.loggedIn && (
          <div className="flex flex-col h-screen">
            <Navbar/>
            <Outlet/>
          </div>
        )
      }
    </>
  )
}
