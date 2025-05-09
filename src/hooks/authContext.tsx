import { createContext, useContext, useEffect, useState } from "react";
import { VerifyToken } from "../api";


type AuthContextType = {
    user ? : { name ?: string; email ?: string; loggedIn ?: boolean; id ?: string;};
    updateUser : (user : {name ?: string; email ?: string; loggedIn ?: boolean , id ?: string }) => void;
    logOut ?:any
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
    const [user, setUser]= useState<{ name ?: string; email ?: string; loggedIn ?: boolean; id?: string}>();
    const [loading, setLoading] = useState(true);

    const updateUser = ({ name, email, loggedIn}: { name ?:string; email ?: string; loggedIn ?: boolean;}) => {
        setUser({
            name,
            email,
            loggedIn
        })
    };


    const logOut = () => {
        localStorage.removeItem("token");
        setUser({ loggedIn : false});
    };


    console.log("Auth context");


    useEffect(() => {
        const veriftyToken = async () => {
         try {
            const response =  await VerifyToken();
            if(response.success){
              setUser({
                  name:response?.user?.name,
                  email: response?.user?.email,
                  loggedIn : true,
                  id: response?.user?.id
              })
            }else{
              setUser({
                loggedIn:false
              })
            }
            setLoading(false);
         } catch (error) {
            console.log("HAI")
            setUser({
                loggedIn:false
            })
            setLoading(false);
         }
        }

        veriftyToken();

    }, [])


    return(
        <AuthContext.Provider value={{ user, updateUser, logOut}}>
            { !loading && (
                children
            )}
        </AuthContext.Provider>
    );
};