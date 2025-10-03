import React from 'react';
import logo from '../assets/logo.png';

function Footer() {
    return (
        <div className='w-full md:h-[36vh] h-[26vh] mb-[77px] md:mb-0 bg-[#dbfcfcec]'>
            <div className='w-full md:h-[30vh] h-full flex items-center justify-center md:px-[50px] px-[5px] gap-[10px]'>
                
                {/* Logo & Description */}
                <div className='md:w-[30%] w-[35%] h-full flex justify-center flex-col gap-[5px]'>
                    <div className='flex items-center justify-start items-center gap-[7px] mt-[10px] md:mt-[40px]'>
                        <img src={logo} alt="Logo" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]' />
                        <p className='text-[19px] md:text-[20px] text-black font-semibold'>OneCart</p>
                    </div>
                    <p className='text-[15px] text-black hidden md:block'>
                        OneCart is your one-stop destination for all your shopping needs,
                        offering a wide range of products at unbeatable prices.
                    </p>
                    <p className='text-[15px] text-black block md:hidden'>
                        Fast. Easy. Reliable. OneCart Shopping.
                    </p>
                </div>

                {/* Company Links */}
                <div className='md:w-[30%] w-[35%] h-full flex items-center justify-center flex-col text-center'>
                    <div className='flex items-center justify-center gap-[7px] mt-[10px] md:mt-[40px]'>
                        <p className='text-[19px] md:text-[20px] text-black font-sans font-semibold'>COMPANY</p>
                    </div>
                    <ul>
                        <li className='text-[15px] text-black hidden md:block cursor-pointer'>Home</li>
                        <li className='text-[15px] text-black hidden md:block cursor-pointer'>About Us</li>
                        <li className='text-[15px] text-black hidden md:block cursor-pointer'>Delivery</li>
                        <li className='text-[15px] text-black hidden md:block cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact Links */}
                <div className='md:w-[30%] w-[35%] h-full flex items-center justify-center flex-col text-center'>
                    <div className='flex items-center justify-center gap-[7px] mt-[10px] md:mt-[40px]'>
                        <p className='text-[19px] md:text-[20px] text-black font-sans font-semibold'>GET IN TOUCH</p>
                    </div>
                    <ul>
                        <li className='text-[15px] text-black hidden md:block cursor-pointer'>Contact Us</li>
                        <li className='text-[15px] text-black hidden md:block cursor-pointer'>Support</li>
                        <li className='text-[15px] text-black hidden md:block cursor-pointer'>Careers</li>
                        <li className='text-[15px] text-black hidden md:block cursor-pointer'>Help Center</li>
                    </ul>
                </div>
            </div>
            <div className='w-[100%] h-[1px] bg-slate-400'></div>
            <div className='w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center'>
                <p className='text-[20px] text-black font-semibold'>
                    © 2025 OneCart. All rights reserved.
                </p>
            </div>

            
        </div>
    );
}

export default Footer;
