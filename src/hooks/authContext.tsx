import { createContext, useContext, useEffect, useState } from "react";
import { VerifyToken } from "../api";


type AuthContextType = {
    user ? : { name : string; email: string;},
    updateUser : (user : {name: string; email: string;}) => void,
    logOut ?: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context =  useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }: { children : any}) => {
    const [user, setUser]= useState<{ name: string; email: string;} | undefined>();

    const updateUser = ({ name, email}: { name:string; email: string;}) => {
        setUser({
            name,
            email
        })
    };


    const logOut = () => {
        localStorage.removeItem("token");
        setUser(undefined);
    }


    useEffect(() => {
        const veriftyToken = async () => {
          const response =  await VerifyToken();
          if(response.success){
            setUser({
                name:response?.user?.name,
                email: response?.user?.email
            })
          }
        }

        veriftyToken();
    }, [])


    return(
        <AuthContext.Provider value={{ user, updateUser, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};