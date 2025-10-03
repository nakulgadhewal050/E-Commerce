import React from 'react'

function Title({text1, text2}) {
  return (
    <div className='flex gap-2 items-center justify-center mb-3 lg:text-[35px] md:text-[25px]'>
     
     <p className='text-blue-100'>{text1}</p>
     <p className='text-[#a5faf7]'>{text2}</p>
     
    </div>
  )
}

export default Title
