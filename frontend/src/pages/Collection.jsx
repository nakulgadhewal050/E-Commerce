
import { useContext, useEffect, useState } from 'react';
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';


function Collection() {

  let {products,search,showSearch} = useContext(shopDataContext);

  let[showFilter, setShowFilter] = useState(false);
  let[filterProducts, setFilterProducts] = useState([]);
  let[category, setCategory] = useState([]);
  let[subCategory, setSubCategory] = useState([]);
  let[sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    if(category.includes(value)){
      setCategory(prev => prev.filter(item => item !== value));
    } 
    else {
      setCategory(prev => [...prev, value ]);
    }
  }


  const toggleSubCategory = (e) => {
    const value = e.target.value;
     if(subCategory.includes(value)){
      setSubCategory(prev => prev.filter(item => item !== value));
    } 
    else {
      setSubCategory(prev => [...prev, value ]);
    }
  }

  const applyFilter = () => {
    let productCopy = products.slice();
    
     if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      console.log("Search term:", search);
     }

    if(category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    
    setFilterProducts(productCopy);
  }

  const sortProducts = (e) => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {

      case 'low-high': 
        setFilterProducts(fpCopy.sort((a,b)=> a.price - b.price));
        break;

      case 'high-low': 
        setFilterProducts(fpCopy.sort((a,b)=> b.price - a.price));
        break;
    
      default: applyFilter();
        break;
    }
  }

  useEffect(() => {
   setFilterProducts(products);
  },[products])

  useEffect(() => {
    applyFilter();
  },[category, subCategory, search, showSearch,products]);

  useEffect(() => {
    sortProducts();
  },[sortType])

  return (

     <div className='w-screen h-screen overflow-x-hidden'>
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start  flex-col md:flex-row
     justify-start pt-[70px] overflow-x-hidden z-[2] pb-[90px]'>

      <div className={`md:w-[20vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${showFilter ? "lg:h-[45vh] md:h-[8vh] " : ""} select-none p-[20px] border-r-[1px]  border-gray-400 text-[#aaf5fa] lg:fixed`}>

        <p className='lg:text-[30px] md:text-[25px] font-semibold flex gap-[5px] items-center justify-start' onClick={()=> setShowFilter(prev=> !prev )}>
              FILTERS
              {!showFilter && <FaAngleRight className='text-[18px] cursor-pointer ' />}
              {showFilter && <FaAngleDown className='text-[18px] cursor-pointer'/>}
        </p>

        <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden "}select-none`}>
           <p className='text-[18px] text-[#f8fafa] '>
            CATEGORIES
           </p>
           <div className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col '>

           <p className=' flex items-center justify-start gap-[10px] text-[16px] font-light '>
              <input type="checkbox" value={'Men'} className='w-3 cursor-pointer' onChange={toggleCategory} />
              Men
           </p>
           <p className=' flex items-center justify-start gap-[10px] text-[16px] font-light '>
              <input type="checkbox" value={'Women'} className='w-3 cursor-pointer'onChange={toggleCategory} />
              Women
           </p>
           <p className=' flex items-center justify-start gap-[10px] text-[16px] font-light '>
              <input type="checkbox" value={'Kids'} className='w-3 cursor-pointer'onChange={toggleCategory} />
              Kids
           </p>
           </div>
        </div>

         <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden "}select-none`}>
           <p className='text-[18px] text-[#f8fafa] '>
            SUB-CATEGORIES
           </p>
           <div className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col '>

           <p className=' flex items-center justify-start gap-[10px] text-[16px] font-light '>
              <input type="checkbox" value={'Topwear'} className='w-3 cursor-pointer' onChange={toggleSubCategory} />
              TopWear
           </p>
           <p className=' flex items-center justify-start gap-[10px] text-[16px] font-light '>
              <input type="checkbox" value={'BottomWear'} className='w-3 cursor-pointer'onChange={toggleSubCategory} />
              BottomWear
           </p>
           <p className=' flex items-center justify-start gap-[10px] text-[16px] font-light '>
              <input type="checkbox" value={'WinteWear'} className='w-3 cursor-pointer'onChange={toggleSubCategory} />
              WinteWear
           </p>
           </div>
        </div>
      </div>

      <div className='lg:pl-[20%] md:py-[10px] '>
        <div className='md:w-[80vw] md:mt-[15px]  w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px] lg:mt-0 items-center'>
            <Title text1={"ALL"} text2={"COLLECTIONS"}/>

            <select name="" id="" className='bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-[white] rounded-lg cursor-pointer
            hover:border-[#46d1f7] border-[2px] ' onChange={(e) => setSortType(e.target.value)}>
              <option value="relavent" className='w-[100%] h-[100%]' >Short By: Relavent</option>
              <option value="low-high" className='w-[100%] h-[100%]'>Short By: Low To High</option>
              <option value="high-low" className='w-[100%] h-[100%]'>Short By: High To Low</option>
            </select>
        </div>
        <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]'>
          
       {
        filterProducts.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          ))
       }
         </div>
        </div>
      </div>
    </div>  
  )
}

export default Collection