import {  Outlet } from "react-router";
import AuthNavbar from "../component/AuhNavbar";

function Authlayout() {
    console.log('Auth layout');
    
    return (
        <>
            <AuthNavbar/>
            <Outlet/>
        </>
    );
}

export default Authlayout