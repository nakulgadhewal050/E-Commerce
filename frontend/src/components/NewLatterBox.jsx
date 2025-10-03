import React from 'react'

function NewLatterBox() {

    const handleSubmit = (e) => {
        e.preventDefault();
    
        alert("Thank you for your message!");
        e.target.reset(); 
       
    }

    return (
        <div className='w-[100%] h-[70vh] md:h-[70vh] flex items-center justify-start flex-col  bg-gradient-to-l from-[#141414] to-[#0c2025] 
    gap-[10px]  '>
            <p className='md:text-[30px] text-[20px] text-[#a5faf7] font-semibold
        px-[20px]'>Contact-Us</p>

            <p className='md:text-[18px] text-[14px] text-center text-blue-100 font-semibold
        px-[20px]'>
                Subscribe now and enjoy Exclusive savings, special offers, and the latest updates delivered straight to your inbox.
            </p>

            <form action="" onSubmit={handleSubmit}
                className="w-[50%] md:h-[70%] flex flex-col items-center justify-center my-10 gap-5 px-5 
             bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg">

                <input
                    type="text"
                    placeholder="Enter your Name"
                    className="placeholder:text-black bg-slate-300 w-[600px] max-w-[90%] h-[40px] px-5 rounded-lg"
                    required
                />

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="placeholder:text-black bg-slate-300 w-[600px] max-w-[90%] h-[40px] px-5 rounded-lg"
                    required
                />

                <textarea
                    placeholder="Enter your message"
                    className="placeholder:text-black bg-slate-300 w-[600px] max-w-[90%] h-[70px] px-5 pt-4 rounded-lg resize-none"
                />

                <button type='submit'
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default NewLatterBox