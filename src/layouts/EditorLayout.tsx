import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/authContext";
import { useEffect } from "react";

export default function() {

    const {user} = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if(!user?.loggedIn){
            navigate("/auth/login");
        }
    }, [])
    return (
        <>
            {
                user?.loggedIn && (
                    <div >
                        <Outlet/>
                    </div>  
                )
            }
        </>
    )
}
