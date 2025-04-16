import {  Outlet } from "react-router";

function Authlayout() {
    console.log("AuthLayout ==> ")
    return (
        <>
            <Outlet/>
        </>
    );
}

export default Authlayout