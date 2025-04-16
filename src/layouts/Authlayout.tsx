import {  Outlet } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Authlayout() {
    console.log("AuthLayout ==> ")
    return (
        <>
            {/* <Navbar/> */}
            <Outlet/>
            {/* <Footer/> */}
        </>
    );
}

export default Authlayout