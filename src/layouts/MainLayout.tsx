import { Outlet, useNavigate } from "react-router";
import Navbar from "../component/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../store";


export default function MainLayout() {
  const navigate = useNavigate();
  const {loggedIn, loading} = useSelector((state : RootStore) => state.user);

  console.log("Main Layout", loggedIn, loading);


  useEffect(() => {
    if(! loggedIn && !loading){
      navigate("/auth/login")
    }
  }, [loggedIn, loading]);
  
  return (
    <>
      {
        loggedIn && (
          <div className="flex flex-col h-screen">
            <Navbar/>
            <Outlet/>
          </div>
        )
      }
    </>
  )
}
