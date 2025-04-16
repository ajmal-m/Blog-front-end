import { Outlet } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


export default function MainLayout() {
  return (
    <>
       <div className="flex flex-col h-screen">
          <Navbar/>
          <Outlet/>
        {/* <Footer/> */}
       </div>
    </>
  )
}
