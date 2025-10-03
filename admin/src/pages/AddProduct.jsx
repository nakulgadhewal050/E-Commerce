import React, { useContext } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import upload from '../assets/upload.png'
import { useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from "react-toastify";
import Loading from '../components/Loading'



function AddProduct() {

  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const[loading, setLoading] = useState(false);


  let {serverUrl} = useContext(authDataContext)

  const handleAddProduct = async (e) => {

    setLoading(true);

    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      let result = await axios.post(serverUrl + "/api/product/add", formData, {
        withCredentials: true,
      })

      console.log(result.data);
      setLoading(false);

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("Topwear");
        setSizes([]);
        
         toast.success("Product added successfully! 🎉");
      } else {
        toast.error(result.data.message || "Failed to add product!");
      }

    } catch (error) {
      console.log("Error while adding product: ", error);
      setLoading(false);
      toast.error("Failed to add product!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]  relative '>
      <Nav />
      <Sidebar />

     <div className='w-[82%] min-h-[100vh] max-h-[100vh] overflow-y-auto overflow-x-hidden absolute right-0 smooth-scroll'>

      
        <form action="" onSubmit={handleAddProduct}
               
          className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]'>
          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'>Add Product</div>
          <div className='w-[80%]  h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Upload Images
            </p>
            <div className='w-full h-full flex items-center justify-start gap-4 flex-wrap'>

              <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-transparent hover:border-[#46d1f7] rounded-lg transition duration-200 ease-in-out flex items-center justify-center'>
                <img src={!image1 ? upload : URL.createObjectURL(image1)} alt=""
                  className='w-[80%] h-[80%] object-cover rounded-lg shadow-lg transition duration-200 ease-in-out' />
                <input type="file" id='image1' className='hidden' onChange={(e) => setImage1(e.target.files[0])} required />
              </label>

              <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-transparent hover:border-[#46d1f7] rounded-lg transition duration-200 ease-in-out flex items-center justify-center'>
                <img src={!image2 ? upload : URL.createObjectURL(image2)} alt=""
                  className='w-[80%] h-[80%] object-cover rounded-lg shadow-lg transition duration-200 ease-in-out' />
                <input type="file" id='image2' className='hidden' onChange={(e) => setImage2(e.target.files[0])} required />
              </label>

              <label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-transparent hover:border-[#46d1f7] rounded-lg transition duration-200 ease-in-out flex items-center justify-center'>
                <img src={!image3 ? upload : URL.createObjectURL(image3)} alt=""
                  className='w-[80%] h-[80%] object-cover rounded-lg shadow-lg transition duration-200 ease-in-out' />
                <input type="file" id='image3' className='hidden' onChange={(e) => setImage3(e.target.files[0])} required />
              </label>
              <label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-transparent hover:border-[#46d1f7] rounded-lg transition duration-200 ease-in-out flex items-center justify-center'>
                <img src={!image4 ? upload : URL.createObjectURL(image4)} alt=""
                  className='w-[80%] h-[80%] object-cover rounded-lg shadow-lg transition duration-200 ease-in-out' />
                <input type="file" id='image4' className='hidden' onChange={(e) => setImage4(e.target.files[0])} required />
              </label>
            </div>
          </div>

          <div className='w-[80%] h-[100px] flex flex-col items-start justify-center gap-2.5'>
            <p className='text-[20px] md:text-[25px] font-semibold text-white'>
              Product Name
            </p>
            <input
              type="text"
              placeholder='Enter product name'
              className='w-full max-w-[600px] h-[40px] rounded-lg border-2 border-transparent hover:border-[#46d1f7] bg-slate-600 px-4 text-[18px] placeholder:text-[#ffffffc2] text-white outline-none transition duration-200 ease-in-out'
              onChange={(e) => setName(e.target.value)} value={name} required />
          </div>

          <div className='w-[80%]  flex flex-col items-start justify-center gap-2.5'>
            <p className='text-[20px] md:text-[25px] font-semibold text-white'>
              Product Description
            </p>
            <textarea
              type="text"
              placeholder='Enter product description'
              className='w-full max-w-[600px] h-[100px] py-[10px] rounded-lg border-2 border-transparent hover:border-[#46d1f7] bg-slate-600 px-4 text-[18px] placeholder:text-[#ffffffc2] text-white outline-none transition duration-200 ease-in-out'
              onChange={(e) => setDescription(e.target.value)} value={description} required />
          </div>

          <div className='w-[80%] flex items-center gap-[10px] flex-wrap'>
            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold text-white'>
                Product Category
              </p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-2 text-[18px] text-white outline-none 
                     transition duration-200 ease-in-out'  onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold text-white'>
                Sub-Category
              </p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-2 text-[18px] 
                     text-white outline-none transition duration-200 ease-in-out'  onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                <option value="Topwear">Topwear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          <div className='w-[80%] h-[100px] flex flex-col items-start justify-center gap-2.5'>
            <p className='text-[20px] md:text-[25px] font-semibold text-white' >
              Product Price
            </p>
            <input
              type="text"
              placeholder='Enter product price'
              className='w-full max-w-[600px] h-[40px] rounded-lg border-2 border-transparent hover:border-[#46d1f7] bg-slate-600 px-4 text-[18px] placeholder:text-[#ffffffc2] text-white outline-none transition duration-200 ease-in-out'
              onChange={(e) => setPrice(e.target.value)} value={price} required />
          </div>

          <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]'>
            <p className='text-[20px] md:text-[25px] font-semibold text-white'>Product Size</p>

            <div className='flex items-center justify-start gap-[15px] flex-wrap'>

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] 
                cursor-pointer ${sizes.includes("S") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}

                onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                S
              </div>

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] 
                cursor-pointer ${sizes.includes("M") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}

                onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                M
              </div>

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] 
                cursor-pointer ${sizes.includes("L") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}

                onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                L
              </div>

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] 
                cursor-pointer ${sizes.includes("XL") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}

                onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                XL
              </div>

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] 
                cursor-pointer ${sizes.includes("XXL") ? "bg-green-200 text-black border-[#46d1f7]" : ""}`}

                onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                XXL
              </div>

            </div>
          </div>

          <div className='w-[80%]  flex items-center justify-start gap-[10px] mt-[20px]'>
            <input
              type="checkbox"
              id="checkbox"
              className='w-[20px] h-[20px] cursor-pointer'
              onChange={(e) => setBestSeller(prev => !prev)}
              value={bestSeller}
            />
            <label htmlFor="checkbox"
              className='text-[18px] md:text-[22px] font-semibold text-white cursor-pointer'
            >Add to BestSeller
            </label>
          </div>


            <button
              type="submit"
              className="w-[140px] h-[48px] px-6 py-3 rounded-xl bg-[#46d1f7] flex items-center justify-center 
                      text-black font-semibold 
                       hover:bg-[#1ca6cf] hover:text-white active:text-white active:border-2 
                       border-white cursor-pointer focus:outline-none transition-all duration-200">
              {loading ? <Loading/> : "Add Product"}
            </button>
         

        </form>
      </div>
    </div>
  )
}

export default AddProduct