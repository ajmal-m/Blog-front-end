import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{user: { name: string;}} | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children : any}) => {
    const [user, setUser]= useState(() => {
        return { name:'AJMAL', email:"ajmal@gmail.com"}
    });
    return(
        <AuthContext.Provider value={{ user}}>
            {children}
        </AuthContext.Provider>
    );
};