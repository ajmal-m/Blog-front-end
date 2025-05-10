import { useState } from "react";
import { toast, ToastContainer} from 'react-toastify';
import { LogInUser } from "../../api";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router";

function LogInForm() {

    const [loginData, setLogInData] = useState({
        email:'',
        password:''
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {updateUser} = useAuth();


    const handleLogIn = async (e : React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const response = await LogInUser({ logInData : {...loginData}});

        if(!response?.success){
            setLoading(false);
            toast.error(`${response.message}`);
            return
        }

        localStorage.setItem("token", response.token);
        updateUser({name: response?.user?.name, email: response?.user?.email, loggedIn: true , id: response?.user?.id});
        setLoading(false);
        navigate("/");
    }
  return (
    <>
        <form onSubmit={handleLogIn} className="w-[500px] max-sm:w-[300px] p-[16px] bg-[red] rounded bg-[#223266] dark:bg-[#223266]">
            <div className="mt-[12px]">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                <input 
                    type="email" name="email" id="email"  
                    className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                    border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    value={loginData.email}
                    onChange={(e) => setLogInData({ ...loginData, [e.target.name] : e.target.value})}
                />
            </div>
            <div className="mt-[12px]">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                    type="password" name="password" id="password"  
                    className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                    border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    value={loginData.password}
                    onChange={(e) => setLogInData({ ...loginData, [e.target.name] : e.target.value})}
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
                    loading ? "Logging...." : "Login"
                }
            </button>
        </form>
        <ToastContainer/>
    </>
  )
}

export default LogInForm