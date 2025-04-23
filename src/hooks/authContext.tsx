import { createContext, useContext, useState } from "react";


type AuthContextType = {
    user ? : { name : string; email: string;},
    updateUser : (user : {name: string; email: string;}) => void
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
    const [user, setUser]= useState<{ name: string; email: string;}>();

    const updateUser = ({ name, email}: { name:string; email: string;}) => {
        setUser({
            name,
            email
        })
    };


    return(
        <AuthContext.Provider value={{ user, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};