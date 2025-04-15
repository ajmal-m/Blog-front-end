import { NavLink, Outlet } from "react-router";


function Authlayout() {
    console.log("AuthLayout ==> ")
    return (
        <>
            <h2>Navbar</h2>
            <NavLink to={'/signin'}>
                Signin
            </NavLink>
            <Outlet/>
            <h2>Footer</h2>
        </>
    );
}

export default Authlayout