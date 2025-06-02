import { memo, useCallback, useState } from "react";

const PasswordInput = memo(({ password, setPassword}: { password: string; setPassword: (p : string) => void}) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const updateIntoVisible = useCallback(() => {
        setPasswordVisible(pass => !pass);
    }, [passwordVisible])
    return(
        <>
            <div className="relative">
                <input 
                    type={passwordVisible ? "text" :"password"} 
                    name="password" 
                    className="w-full bg-gray-50 rounded text-black p-3 outline-none mt-1 text-[14px] pr-[40px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    passwordVisible ? (
                        <svg onClick={() => updateIntoVisible()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye absolute top-4 right-2 cursor-pointer">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                    ):(
                        <svg onClick={() => updateIntoVisible()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        className="lucide lucide-eye-off-icon lucide-eye-off absolute top-4 right-2 cursor-pointer">
                        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>
                        </svg>
                    )
                }
            </div>
        </>
    )
});


export default PasswordInput;