import { memo } from "react";

const Loader = memo(({ color} : { color: string}) => {
    return(
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
        </>
    )
});

export default Loader;