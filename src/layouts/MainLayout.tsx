import { Outlet, useNavigate } from "react-router";
import Navbar from "../component/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../store";


export default function MainLayout() {
  const navigate = useNavigate();
  const user = useSelector((state : RootStore) => state.user);

  console.log("Main Layout", user);


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
