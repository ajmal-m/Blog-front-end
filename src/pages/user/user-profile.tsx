import { memo } from "react";
import { Avatar } from "flowbite-react";



const UserForm = memo(({ user }: { user : any}) => {
    return(
        <>
            <div className="w-full flex items-center justify-center">
               <form 
                    className="
                        flex min-w-[400px] flex-col gap-4 
                        border-[2px] border-[#070238] p-[12px] 
                        rounded bg-[#101828] mt-4
                        max-sm:min-w-[300px]
                    "
                >
                    <div>
                        <Avatar rounded size="xl"/>
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
                            readOnly
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