import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext';
import { useState } from 'react';
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import RelatedProduct from '../components/RelatedProduct';


function Productdetails() {

  let { productId } = useParams();
  let { products, currency, addtoCart } = useContext(shopDataContext);
  let [productData, setProductData] = useState(false);



  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
   
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
       
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setImage(item.image1);
        
       return null;
      }
    
      return null;

    });
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div >
      <div className='lg:w-[100vw] md:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center 
               justify-start flex-col lg:flex-row gap-[20px]'>

        <div className='lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-[10px]
           gap-[30px] flex-col-reverse lg:flex-row'>

          <div className='lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex items-center justify-center gap-[50px] lg:gap-[20px]
              lg:flex-col flex-wrap'>

            <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] 
                  rounded-md cursor-pointer'>
              <img src={image1} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={() => setImage(image1)} />
            </div>
            <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] 
                  rounded-md cursor-pointer'>
              <img src={image2} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={() => setImage(image2)} />
            </div>
            <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] 
                  rounded-md cursor-pointer'>
              <img src={image3} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={() => setImage(image3)} />
            </div>
            <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] 
                  rounded-md cursor-pointer'>
              <img src={image4} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={() => setImage(image4)} />
            </div>

          </div>
          <div className='lg:w-[60%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden'>
            <img src={image} alt="" className='w-[100%] lg:h-[100%] h-[100%] text-[30px] text-white text-center rounded-md object-fill' />
          </div>
        </div>

        <div className='lg:w-[50vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] flex items-start justify-start flex-col py-[20px]
            px-[30px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px] lg:py-[0px] gap-[10px]'>
          <h1 className='text-[40px] font-semibold text-[aliceblue]'>
            {productData.name.toUpperCase()}
          </h1>
          <div className='flex items-center gap-[10px]'>
            <IoIosStar className='text-[20px] fill-[#FFD700]' />
            <IoIosStar className='text-[20px] fill-[#FFD700]' />
            <IoIosStar className='text-[20px] fill-[#FFD700]' />
            <IoIosStar className='text-[20px] fill-[#FFD700]' />
            <IoIosStarHalf className='text-[20px] fill-[#FFD700]' />
            <p className='text-[18px] font-semibold pl-[5px] text-[white]'>(124)</p>
          </div>

          <p className='text-[18px] font-semibold pl-[5px] text-[white]'>
            {currency} {productData.price}
          </p>

          <p className='w-[18%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white]'>
            {productData.description} and Stylish, breathable cotton shirt with a modern slim fit.
          </p>

          <div className='flex flex-col gap-[10px] my-[10px]'>
            <p className='text-[25px] font-semibold pl-[5px] text-[white]'>
              Select Size
            </p>

            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button key={index} className={`border py-2 px-4 bg-slate-300 rounded-md cursor-pointer
                    ${item === size ? 'bg-black text-[#2f97f1] text-[20px]' : ''} `}
                    onClick={() => setSize(item)}> {item}
                  </button>
                ))
              }
            </div>
            <button className="text-white text-[16px] bg-[#495b61c9] hover:bg-[#3c4a4fc9] active:bg-slate-500 
                   py-5 px-5 rounded-2xl mt-2 border border-[#80808049] shadow-md shadow-black 
                   cursor-pointer transition duration-200" onClick={()=> addtoCart(productData._id, size)}>
               Add to Cart
            </button>
          </div>
          <div className='w-[90%] h-[1px] bg-slate-700 '></div>
          <div className='w-[80%] text-[16px] text-white '>
            <p>100% Original Product.</p>
            <p>Cash On Delivery is avialable on this Product</p>
            <p>Fast retrun and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className='w-full bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-start justify-start pt-[40px] px-[20px] lg:px-[80px]'>
        {/* Tabs */}
        <div className='flex gap-5 mb-5'>
          <p className='border px-5 py-3 text-sm text-white cursor-pointer hover:bg-[#ffffff0f] rounded-md'>Description</p>
          <p className='border px-5 py-3 text-sm text-white cursor-pointer hover:bg-[#ffffff0f] rounded-md'>Reviews (124)</p>
        </div>

        {/* Description Box */}
        <div className='w-full md:h-[150px] h-[220px] bg-[#3336397c] border border-[#80808049] text-white 
                  text-[13px] md:text-[15px] lg:text-[18px] px-5 py-5 rounded-lg mb-10'>
          <p>
            Upgrade your wardrobe with our latest collection of trendy and stylish clothing.
            From casual wear to formal attire, we have something for every occasion.
            Our products are made with high-quality materials and designed to provide comfort and style.
            Shop now and elevate your fashion game with our exclusive range of clothing.
          </p>
        </div>

        {/* Related Products Section */}
        <div className='w-full'>
          <RelatedProduct
            category={productData.category}
            subCategory={productData.subCategory}
            currentProductId={productData._id}
          />
        </div>
      </div>


    </div>
  ) : <div className='opacity-0'></div>
}

export default Productdetails