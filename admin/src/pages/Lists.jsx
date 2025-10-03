import React, { useEffect, useState, useContext } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";


function Lists() {

  const [list, setList] = useState([]);

  let { serverUrl } = useContext(authDataContext);


  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data);
      console.log("List fetched successfully:", result.data);
    } catch (error) {
      console.log("Error fetching list:", error);

    }

  }

  const removeList = async (id) => {

    try {

      let result = await axios.post(serverUrl + `/api/product/remove/${id}`, {},
        { withCredentials: true });

 
      if (result.data) {
        toast.success("Product removed successfully! 🎉");
        fetchList();
      }
      else {
        toast.error(result.data || "Failed to removed product!");
        console.log("Product not found or already removed.");

      }

  } catch (error) {
    console.log("Error removing product:", error);
    toast.error("Failed to remove product!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "light",
        });

  }
}


useEffect(() => {
  fetchList();
}, [])


return (
  <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative '>
    <Nav />
    <Sidebar />

    <div className='w-[82%] h-[100%]  flex items-center justify-start overflow-x-hidden absolute right-0 smooth-scroll'>


      <div className='w-[82%] h-[100%] lg:ml-[250px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden 
              py-[50px] ml-[100px]  smooth-scroll '>

        <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'>
          All Listed Products
        </div>



        {list?.length > 0 ? (
          list.map((item, index) => (
            <div className='w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-start
               gap-[5px] md:gap-[30px] p-[10px] md:px-[30px]' key={index} >
              <img src={item.image1} alt="" className='w-[30%] md:w-[120px] h-[90px] rounded-lg' />
              <div className='w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px]'>
                <div className='text-[14px] md:text-[12px] text-gray-300 font-semibold'>{item.name}</div>
                <div className='text-[14px] md:text-[12px] text-gray-300'>Price: ₹{item.price}</div>
                <div className='text-[14px] md:text-[12px] text-gray-300'>Category: {item.category}</div>
                <div className='text-[14px] md:text-[12px] text-gray-300'>Description: {item.description}</div>
              </div>
              <div className='w-[10%] h-[100%] flex items-center justify-center '>
                <span className='w-[35px] h-[30px] flex items-center justify-center  rounded-full cursor-pointer
                   hover:bg-red-500 transition-all duration-300 ease-in-out' onClick={() => removeList(item._id)}>
                  <MdDeleteForever className='w-[20px] h-[20px] text-white' />
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className='text-white text-lg'>No products avialable.</div>
        )}

      </div>
    </div>
  </div>
)
}

export default Lists