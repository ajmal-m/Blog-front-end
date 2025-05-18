import { memo, useCallback } from "react";
import { Avatar } from "flowbite-react";



const UserForm = memo(({ user }: { user : any}) => {

    const updateAvatarImage = useCallback(async () => {
        const inp = document.createElement("input");
        inp.type = 'file';
        inp.accept = 'image/*';
        inp.addEventListener("change", function(e){
            const imageAsset = (e.target as any).files[0];
            const formData = new FormData();
            formData.append("image", imageAsset);
            console.log(formData)
        });
        inp.click();
    }, [])
    return(
        <>
            <div className="w-full flex items-center justify-center">
               <form 
                    className="
                        flex flex-col gap-4 
                        border-[2px] border-[#070238] p-[12px] 
                        rounded bg-[#101828] mt-4
                        max-sm:max-w-[300px]
                    "
                >
                    <div className="relative">
                        <Avatar rounded size="xl"/>
                        <div className="absolute top-[37px] left-[46%]">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                className="lucide lucide-image-plus-icon lucide-image-plus cursor-pointer"
                                onClick={updateAvatarImage}
                            >
                                <path d="M16 5h6"/><path d="M19 2v6"/><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/>
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><circle cx="9" cy="9" r="2"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <label 
                            htmlFor="email"
                            className={`
                                text-white
                                text-[14px] font-[500]
                            `}
                        >
                            Full Name
                        </label>
                        <input 
                            type="email" 
                            name="email"
                            value={user.name}
                            className="w-full bg-[#9897a1] rounded text-black p-3  outline-none mt-1 text-[14px]"
                        />
                    </div>

                    <div>
                        <label 
                            htmlFor="password"
                            className={`
                                text-white
                                text-[14px] font-[500]
                            `}
                        >
                            Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            className="w-full bg-[#9897a1] rounded text-black p-3 outline-none mt-1 text-[14px]"
                        />
                    </div>



                    <div>
                        <label 
                            htmlFor="email"
                            className={`
                                text-white
                                text-[14px] font-[500]
                            `}
                        >
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            className="w-full bg-[#9897a1] rounded text-black p-3 outline-none mt-1 text-[14px]"
                        />
                    </div>
                    
                    <button className="w-full p-4 bg-[blue] rounded text-white font-[500] cursor-pointer text-[14px]">
                        Update Profile
                    </button>
                </form>
            </div>
        </>
    )
});

export default UserForm;