import React from 'react'
import Title from '../components/Title'
import contact from '../assets/contact.avif'

function Contact() {
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px]'>
      <Title text1={'CONTACT'} text2={'US'} />
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img src={contact} alt="" className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm' />
        </div>
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center flex-col gap-[20px] mt-[20px] lg:mt-[0px]'>
          <p className='lg:w-[80%] w-[100%] text-white font-bold lg:text-[18px] text-[15px]'>
            Our Store
          </p>
          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            <p>Random Station</p>
            <p>Random City, State, India</p>
          </p>
          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            <p>Ph +91-8889372964</p>
            <p>Email: OneCart@support.com</p>
          </p>
          <p className='lg:w-[80%] w-[100%] text-[15px] text-white md:text-[16px] lg:text-[18px] mt-[10px] font-bold'>
           Careers at OneCart</p>
            <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            Interested in joining our team? We are always looking for talented individuals 
            who are passionate about e-commerce and customer service. 
            </p>
        </div>
      </div>
    </div>
  )
}

export default Contact