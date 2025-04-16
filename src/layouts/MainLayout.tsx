import { Outlet } from "react-router";
import Navbar from "../component/Navbar";


export default function MainLayout() {
  return (
    <>
       <div className="flex flex-col h-screen">
          <Navbar/>
          <Outlet/>
       </div>
    </>
  )
}
