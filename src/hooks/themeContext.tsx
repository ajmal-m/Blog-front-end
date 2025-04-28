import { createContext, useCallback, useContext, useState } from "react";

type ThemeContextType = {
    theme : string;
    updateTheme: ( theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);



export const ThemeProvider = ({ children} : { children : any}) => {
    const [theme, setTheme] = useState(() => {
        const theme = localStorage.getItem("theme");
        if(theme){
            return theme;
        }else{
            return "dark";
        }
    });


    const updateTheme = useCallback((theme : string) => {
        localStorage.setItem("theme", theme);
        setTheme(theme);
    }, [theme])

    return(
        <ThemeContext.Provider value={{ theme , updateTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};


export const UseTheme = () => {
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("Theme context undefined")
    }
    return context;
}