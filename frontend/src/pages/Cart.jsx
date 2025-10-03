import Title from '../components/Title.jsx'
import { useContext, useState } from 'react'
import { shopDataContext } from '../context/ShopContext.jsx'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { IoTrashBin } from "react-icons/io5";
import CartTotal from './CartTotal.jsx';

function Cart() {

    const { products, currency, cartItem, updateQuantity, removeFromCart } = useContext(shopDataContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItem]);

    return (
        <div className='w-[100vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
            <div className='w-[100%] h-[8%] text-center mt-[80px]'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {cartData.length === 0 ? (
                <div className='w-full h-[60vh] flex items-center justify-center'>
                    <p className='text-white text-2xl'>Your cart is empty</p>
                </div>
            ) : (
                <div className='w-[100%] flex flex-col lg:flex-row gap-[20px] relative'>

                    {/* Cart Items Section */}
                    <div className='w-full lg:w-[65%] flex flex-col gap-[20px] lg:pr-[20px]'>
                        {cartData.map((item, index) => {
                            const productData = products.find((product) => product._id === item._id);

                            if (!productData) return null;

                            return (
                                <div key={index} className='w-[100%] border-t border-b'>
                                    <div className='w-[100%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative'>

                                        <img className='w-[100px] h-[100px] rounded-sm object-cover' src={productData.image1} alt={productData.name} />

                                        <div className='flex items-start justify-center flex-col gap-[10px]'>
                                            <p className='md:text-[25px] text-[20px] text-[#f3f9fc]'>
                                                {productData.name}
                                            </p>
                                            <div className='flex items-center gap-[20px]'>
                                                <p className='text-[20px] text-[#aaf4e7]'>
                                                    {currency} {productData.price}
                                                </p>
                                                <p className='w-[30px] h-[30px] text-[16px] text-[white] bg-[#518080b4] rounded-md mt-[5px] flex items-center justify-center border-[1px] border-[#9ff9f9] cursor-pointer'>
                                                    {item.size}
                                                </p>
                                            </div>
                                        </div>

                                        <input
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            className='md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-[white] text-[18px] font-semibold bg-[#518080b4] absolute md:top-[14%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-[#9ff9f9] rounded-md'
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                if (value > 0) {
                                                    updateQuantity(item._id, item.size, value);
                                                }
                                            }}
                                        />

                                        <IoTrashBin
                                            className='text-[#9ff9f9] w-[25px] h-[25px] absolute top-[50%] md:top-[40%] right-5 cursor-pointer hover:text-red-400 transition-colors'
                                            onClick={() => removeFromCart ? removeFromCart(item._id, item.size) : updateQuantity(item._id, item.size, 0)}
                                        />

                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Vertical Line */}
                    <div className='hidden lg:block lg:w-[1px] lg:bg-gray-400 lg:absolute lg:left-[65%] lg:top-0 lg:h-full'></div>

                    {/* Cart Total Section - Fixed Position */}
                    <div className='w-full lg:w-[35%] lg:fixed lg:right-[20px] lg:top-[200px] lg:h-fit lg:z-10'>
                        <div className='w-full max-w-[400px] lg:max-w-[350px] mx-auto'>
                            <CartTotal />
                             <div className='w-full flex justify-center mt-[20px]'>
                                <button
                                    className='w-[80%] text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[30px] rounded-2xl text-white 
                                              flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] transition-colors'
                                    onClick={() => {
                                        if (cartData.length > 0) {
                                            navigate("/placeorder");
                                        } else {
                                            alert("Your cart is empty. Please add items to proceed.");
                                        }
                                    }}
                                >
                                    PROCEED TO CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Cart