import logo from '../assets/logo.png';
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useContext, useState } from 'react';
import { userDataContext } from '../context/UserContext.jsx';
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthDataContext } from '../context/AuthContext';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { shopDataContext } from '../context/ShopContext.jsx';
import {toast} from 'react-toastify';


function Nav() {


  let { userData, getCurrentUser } = useContext(userDataContext);
  let { serverUrl } = useContext(AuthDataContext);
  let navigate = useNavigate();
  // let [showSearch, setShowSearch] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  // let { search, setSearch } = useContext(shopDataContext);
  let { search, setSearch, showSearch, setShowSearch, getCartCount } = useContext(shopDataContext);




  const handleLogout = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true
      })
      console.log("Logout result:", result);
      getCurrentUser();
      toast.success("Logout successful!");
      navigate("/login");


    } catch (error) {
      console.log("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };



  return (
    <nav className='w-full h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black' role="navigation">

      <div className='flex items-center gap-3 cursor-pointer'>
        <img src={logo} alt="OneCart Logo" className='w-8 h-8 md:w-10 md:h-10' />
        <h1 className='text-2xl md:text-3xl text-gray-800 font-bold tracking-tight'>
          <span className='text-blue-600'>One</span>Cart
        </h1>
      </div>

      <div className='w-[40%] hidden md:flex'>
        <ul className='flex items-center justify-center gap-5 text-white'>
          <li className='text-sm bg-black bg-opacity-80 py-3 px-4 rounded-2xl hover:bg-slate-500 transition duration-300 cursor-pointer'
            onClick={() => { navigate("/") }}>
            Home
          </li>
          <li className='text-sm bg-black bg-opacity-80 py-3 px-4 rounded-2xl hover:bg-slate-500 transition duration-300 cursor-pointer'
            onClick={() => { navigate("/collection") }}>
            Collections
          </li>
          <li className='text-sm bg-black bg-opacity-80 py-3 px-4 rounded-2xl hover:bg-slate-500 transition duration-300 cursor-pointer'
            onClick={() => { navigate("/contact") }}>
            Contact
          </li>
          <li className='text-sm bg-black bg-opacity-80 py-3 px-4 rounded-2xl hover:bg-slate-500 transition duration-300 cursor-pointer'
            onClick={() => { navigate("/about") }}>
            About
          </li>

        </ul>
      </div>
      <div className='w-[30%] flex items-center justify-end gap-[20px]'>

        {!showSearch && <IoSearchCircleOutline className='w-[35px] h-[35px] text-[#000000] cursor-pointer'
          onClick={() => { setShowSearch(prev => !prev); navigate('/collection') }} />}
        {showSearch && <IoSearchCircle className='w-[35px] h-[35px] text-[#000000] cursor-pointer'
          onClick={() => setShowSearch(prev => !prev)} />}

        {!userData && <FaRegUserCircle className='w-[29px] h-[29px] text-[#000000] cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />}
        {/* Updated user profile logic */}
        {!userData ? (
          // Show user icon if not logged in
          <FaRegUserCircle className='w-[29px] h-[29px] text-[#000000] cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />
        ) : (
          // Show user avatar if logged in
          <div className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer'
            onClick={() => setShowProfile(prev => !prev)}>
            {userData.user?.name ? userData.user.name.charAt(0).toUpperCase() :
              userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}

        {userData && <MdOutlineShoppingCart className='w-[29px] h-[29px] text-[#000000] cursor-pointer hidden md:block'
          onClick={() => { navigate("/cart") }} />}

        {userData && <p className='absolute w-[18px] h-[18px]  items-center justify-center bg-black px-[5px] py-[2px] 
           text-white rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>
          {getCartCount()}
        </p>}
      </div>

      {showSearch && <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center'>
        <input type="text" className=' w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white]
        text-[18px]' placeholder='Search...' onChange={(e) => { setSearch(e.target.value) }} value={search} />
      </div>}

      {showProfile && <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10' >
        <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[white] text-[17px] py-[10px]'>

          {!userData && <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
            onClick={() => {
              navigate("/login"); setShowProfile(false);
            }}
          >login</li>}
          {userData && <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
            onClick={async () => {
              setShowProfile(false);
              await handleLogout();
            }}
          >logout</li>}
          <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
            onClick={() => navigate('/order')}>
            Orders</li>
          <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
            onClick={() => navigate("/about")}>
            About</li>
        </ul>

      </div>}

      <div className='w-[100vw] h-[90px] flex itemscenter justify-between bg-[#191818] px-[20px] text-[12px] fixed bottom-0 left-0 md:hidden'>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => { navigate("/") }}>
          <IoMdHome className='w-[25px] h-[25px] text-[white] md:hidden' />
          Home
        </button>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => { navigate("/collection") }}>
          <HiOutlineCollection className='w-[25px] h-[25px] text-[white] md:hidden' />
          Collection
        </button>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => { navigate("/contact") }}>
          <MdContacts className='w-[25px] h-[25px] text-[white] md:hidden' />
          Contect
        </button>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => { navigate("/cart") }}>
          <MdOutlineShoppingCart className='w-[25px] h-[25px] text-[white] md:hidden' />
          Cart
        </button>
        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] 
           text-black font-semibold  rounded-full text-[9px] top-[8px] right-[18px]'>
          {getCartCount()}
        </p>

      </div>

    </nav>
  );
}

export default Nav;
