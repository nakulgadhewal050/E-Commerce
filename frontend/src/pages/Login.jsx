
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import google from '../assets/google.png';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from 'react';
import { useContext } from 'react';
import { AuthDataContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase.js';
import { userDataContext } from '../context/UserContext.jsx';
import Loading from '../components/Loading.jsx';
import { toast } from 'react-toastify';



function login() {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let { getCurrentUser } = useContext(userDataContext);
  let [loading, setLoading] = useState(false);



  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + '/api/auth/login', {
        email, password
      }, { withCredentials: true });
      console.log("Login result:", result.data);
      setLoading(false);
      getCurrentUser();
      navigate('/');
      toast.success("Login successful!");

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Invalid Email or Password");
    }
  }


  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(serverUrl + '/api/auth/googlelogin', {
        name, email
      }, { withCredentials: true });
      
      await getCurrentUser();
      navigate('/');
      toast.success("Login successful!");

    } catch (error) {
      console.log(error);
      toast.error("Error during Google login. Please try again.");
    }
  }


  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>

      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate('/')}>
        <img className='w-[40px]' src={logo} alt="" />
        <h1 className='text -[22px] font-sans'>OneCart</h1>
      </div>

      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login Here</span>
        <span className='text-[16px]'>Welcome to OneCart, Place your order</span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg
      flex items-center justify-center'>

        <form className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' action="" onSubmit={handleLogin}>
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex justify-center items-center gap-[10px] py-[20px] cursor-pointer'
            onClick={googleLogin}>
            <img className='w-[30px]' src={google} alt="" />Signup with Google
          </div>
          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px] '>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative '>

            <input type="email"
              className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7]
              px-[20px]  font-semibold'
              placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type={show ? "text" : "password"}
              className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7]
              px-[20px]  font-semibold'
              placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
            {show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[56%]' onClick={() => setShow(prev => !prev)} />}
            {!show && <IoEyeOffOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[56%]' onClick={() => setShow(prev => !prev)} />}

            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold 
                 cursor-pointer'> {loading ? <Loading/> : "Login"}</button>

            <p className='flex gap-[10px]'>You have no account
              <a className='text-[#5555f6] text-[17px] font-semibold cursor-pointer hover:underline' href="/signup">Create New Account</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}


export default login
