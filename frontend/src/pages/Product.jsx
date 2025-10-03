import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

function product() {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]  flex flex-col items-center justify-start py-[20px] '>
       
       <div className='w-[100%]  min-h-[70px] flex items-center justify-center gap-[10px] flex-col'>
        <div className="w-[90%] h-[2px] bg-[#494444] my-10 "/>
           <LatestCollection/>
       </div>

       <div className='w-[100%]  min-h-[70px] flex items-center justify-center gap-[10px] flex-col mt-[70px]'>
        <div className="w-[90%] h-[2px] bg-[#494444] my-10 "/>
           <BestSeller/>
       </div>
    </div>
  )
}

export default product