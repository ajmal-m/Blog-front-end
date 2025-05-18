import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store";
import UserForm from "./user-profile";

const UserProfile = memo(() => {
    const theme = useSelector((state : RootStore) => state.theme.theme);
    const user = useSelector( ( state : RootStore ) => state.user);
    useEffect(() => {

    }, [])
    return(
        <>
           <div className={`min-h-[calc(100vh-73px)] overflow-y-scroll ${theme === 'dark' ? 'bg-[black]' : 'bg-[white]'}`}>
                <UserForm
                    user={user}
                />
           </div>
        </>
    )
});

export default UserProfile;