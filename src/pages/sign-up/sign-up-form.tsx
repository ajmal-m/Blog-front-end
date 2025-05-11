import { useState } from "react";
import { User } from "../../types";
import {toast, ToastContainer} from 'react-toastify';
import { CreateUser } from "../../api";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/authContext";

function SignUpForm() {

    const [userData, setUserData] = useState<User>({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const [loading, setLoading] = useState<boolean>(false);


    const navigate = useNavigate();


    const {updateUser} = useAuth();

    const handleSubmit = async (e : React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        if(userData.password !== userData.confirmPassword){
            toast.warning("Passowrd is not match");
            return
        }
        const response = await CreateUser({ userData });
        if(!response?.success){
            setLoading(false);
            toast.error(`${response.message}`);
            return
        }
        localStorage.setItem("token", response.token);
        updateUser({
            name:response?.user?.name,
            email: response?.user?.email,
            loggedIn:true,
            id: response?.user?.id
        });
        setLoading(false);
        navigate("/");
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="w-[500px] max-sm:w-[300px] p-[16px] bg-[red] rounded bg-[#223266] dark:bg-[#223266]" >
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                    <input type="text" name="name" id="name"  className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                    border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter name...."
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, [e.target.name] : e.target.value})}
                    />
                </div>
                <div className="mt-[12px]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                    <input type="email" name="email" id="email"  className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                    border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, [e.target.name] : e.target.value})}
                    />
                </div>
                <div className="mt-[12px]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password"  className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                    border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, [e.target.name] : e.target.value})}
                    
                    />
                </div>
                <div className="mt-[12px]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword"  className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                    border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setUserData({ ...userData, [e.target.name] : e.target.value})}
                    value={userData.confirmPassword}
                    
                    />
                </div>
                <button  
                    type="submit" 
                    className="
                        text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                        py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                        focus:outline-none dark:focus:ring-blue-800 cursor-pointer
                        mt-6 w-full
                    "
                >
                    {
                        loading ? "Creating...." : "Create Account"
                    }
                </button>
            </form>

            <ToastContainer/>
        </>
    )
}

export default SignUpForm