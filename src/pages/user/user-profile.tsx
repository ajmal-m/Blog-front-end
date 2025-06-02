import { FormEvent, memo, useCallback, useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import { updateUser, uploadImage } from "../../api";
import PasswordInput from "./password-input";
import TextInput from "./text-input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store";
import { useNavigate } from "react-router";
import { updateUserDetail } from "../../store/userSlice";
import Loader from "./loader";



const UserForm = memo(({ toast }: { toast: any}) => {

    const navigate = useNavigate();
    const {name, avatar} = useSelector((state: RootStore) => state.user);
    const [uploadedImage, setUplodedImage] = useState<string | null >(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [submitLoader, setSubmitLoader] = useState(false);
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const userId = useSelector((state: RootStore) => state.user).id;
    const dispatch = useDispatch<AppDispatch>();


    const updateAvatarImage = useCallback(async () => {
        const inp = document.createElement("input");
        inp.type = 'file';
        inp.accept = 'image/*';
        inp.addEventListener("change", async function(e){
            setLoading(true);
            const imageAsset = (e.target as any).files[0];
            const formData = new FormData();
            formData.append("image", imageAsset);
            const data = await uploadImage(formData, 144, 144);
            if(data?.url){
                setLoading(false);
                setUplodedImage(data.url)
            }
        });
        inp.click();
    }, [loading, uploadedImage]);


    const updateProfile = useCallback(async(e: FormEvent) => {
        e.preventDefault();
        let allOk = true;
        if(!fullName){
            toast.error("Full Name is required.");
            allOk = false;
        }
        if(!password){
            toast.error("Password is required.");
            allOk = false;
        }
         if(!confirmPassword){
            toast.error("Confirm Password is required.");
            allOk = false;
        }
        if( password !== confirmPassword){
            toast.error("Password is not match.");
            allOk = false;
        }

        if(!allOk){
            return;
        }
        // UPdate Profile API call
        setSubmitLoader(true);
        const response = await updateUser({
            name: fullName,
            password,
            avatar: uploadedImage,
            id: userId
        });

        if(response.success){
            toast.success(response.message);
            dispatch(updateUserDetail({ name: fullName, avatar: uploadedImage}));
            setSubmitLoader(false);
            navigate("/");
        }else{
            setSubmitLoader(false);
            toast.error(response.message);
        }
        
    }, [fullName, password, confirmPassword, uploadedImage])

    useEffect(( ) => {
        setFullName(name);
        setUplodedImage(avatar);
    }, [])
    return(
        <>
            <div className="w-full flex items-center justify-center">
               <form 
                    className="
                        flex flex-col gap-4 
                        border-[2px] border-[#070238] p-[12px] 
                        rounded bg-[#223266] mt-4
                        max-sm:max-w-[300px] md:min-w-[400px]
                    "
                >
                    <div className="relative">
                        {
                            uploadedImage ? (
                                <>
                                    <Avatar rounded size="xl" img={uploadedImage} />
                                    <div className="absolute top-0 left-0 cursor-pointer" onClick={() => setUplodedImage(null)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2-icon lucide-trash-2">
                                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                                        </svg>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Avatar rounded size="xl"/>
                                    <div className="absolute top-[37px] left-[46%]">
                                        {
                                            loading ? (
                                                <Loader color="black"/>
                                            ) : (
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                                    stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                                    className="lucide lucide-image-plus-icon lucide-image-plus cursor-pointer"
                                                    onClick={updateAvatarImage}
                                                >
                                                    <path d="M16 5h6"/><path d="M19 2v6"/><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/>
                                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><circle cx="9" cy="9" r="2"/>
                                                </svg>
                                            )
                                        }
                                    </div>
                                </>
                            )
                        }
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
                        <TextInput
                            value={fullName}
                            setValue={setFullName}
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
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
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
                       <PasswordInput
                        password={confirmPassword}
                        setPassword={setConfirmPassword}
                       />
                    </div>
                    
                    <button 
                        onClick={updateProfile} 
                        type="submit" 
                        className="
                            w-full p-4 bg-[#0000e7] rounded text-white 
                            font-[500] cursor-pointer text-[14px] flex
                            justify-center
                        "
                    >
                        {
                            submitLoader ? (
                                <Loader color="currentColor"/>
                            ) : ("Update Profile")
                        }
                    </button>
                </form>
            </div>
        </>
    )
});

export default UserForm;