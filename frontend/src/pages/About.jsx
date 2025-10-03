import React from 'react'
import Title from '../components/Title'
import about from '../assets/about.png'

function About() {
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px]'>
          <Title text1={'ABOUT'} text2={'US'}/>
          <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
            
            <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
               <img src={about} alt="" className='lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm' />
            </div>

            <div className='lg:w-[50%] w-[80%] flex items-start justify-center flex-col gap-[20px] mt-[20px] lg:mt-[0px]'>
                    <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
                      OneCart born for smart, seamless shopping-created to 
                      deliver quality products, trending styles, and
                      everyday essentials in one place. With reliable 
                      service, fast delivery, and great value, OneCart makes
                      your online shopping experience easy and enjoyable.
                      </p>
                    <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
                      Modern shoppers-combining style, convenience, and 
                      affordability. We offer a wide range of products, from
                      fashion to electronics, all at competitive prices.
                    </p>
                    <p className='lg:w-[80%] w-[100%] text-white lg:text-[18px] mt-[10px] font-bold'>
                      Our Mission
                    </p>
                    <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
                      Our mission is to provide a seamless online shopping experience that combines 
                      quality, convenience, and affordability. We strive to be the go-to destination 
                      for modern shoppers, offering a wide range of products that cater to their 
                      diverse needs and preferences.
                    </p>
            </div>
          </div>
    </div>
  )
}

export default About