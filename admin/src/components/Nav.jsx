import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { toast } from 'react-toastify';


function Nav() {

    let navigate = useNavigate();

    let {serverUrl, getAdmin} = useContext(authDataContext)

    const handleLogout = async () => {
        try {
            
            let result = await axios.get(serverUrl + '/api/auth/adminlogout', {
                withCredentials: true
            });
            if(getAdmin){
                await getAdmin();
            }
            navigate("/login");
            toast.success("Logout successful!");
            console.log("Logout result:", result.data);

        } catch (error) {
            console.log("Error during logout:", error);
        
        }
    }
 
    return (
        <div className='w-[100%] h-[70px] bg-[#dcdbdbf8] z-10 fixed  top-0 flex items-center justify-between px-[30px]
      overflow-x-hidden shadow-md shadow-black'>
            <div className='flex items-center gap-3 cursor-pointer'>
                <img src={logo} alt="OneCart Logo" className='w-8 h-8 md:w-10 md:h-10' />
                <h1 className='text-2xl md:text-3xl text-gray-800 font-bold tracking-tight'>
                    <span className='text-blue-600'>One</span>Cart
                </h1>
            </div>
            <button className='text-[15px] hover:border-[2px]  cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white'
              onClick={handleLogout} >
                Logout
            </button>
        </div>
    )
}

export default Nav