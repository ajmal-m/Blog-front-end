import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../store";

export default function() {

    const user = useSelector((state:RootStore) => state.user);
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
