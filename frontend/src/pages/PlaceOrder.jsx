import { useState } from 'react'
import Title from '../components/Title'
import CartTotal from './CartTotal'
import razorpay from '../assets/razorpay.png'
import { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { AuthDataContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

function placeOrder() {

  let [method, setMethod] = useState("Cash On Delivery")
  const { cartItem, setCartItem, products, getCartAmmount, delivery_fee } = useContext(shopDataContext);
  let { serverUrl } = useContext(AuthDataContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RZP_APIKEY,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {

        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response,
          { withCredentials: true });
        if (data) {
          navigate('/order');
          toast.success("Payment successful!");
          setCartItem({});
        }
      },
     
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty!");
        return;
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmmount() + delivery_fee,
      }

      switch (method) {
        case 'Cash On Delivery':
          const result = await axios.post(serverUrl + '/api/order/placeorder', orderData,
            { withCredentials: true });

          if (result.data) {
            setCartItem({});

            toast.success("Order placed successfully! 🎉");
            navigate('/order');
          } else {
            toast.error("Failed to place order!");
          }
          break;

        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + '/api/order/razorpay', orderData,
            { withCredentials: true });

          if (resultRazorpay.data) {
            initPay(resultRazorpay.data);
          }
          break;

        default:
          break;
      }

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log("Error in placing order: ", error);
      toast.error("Error placing order. Please try again!");
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center
        flex-col md:flex-row gap-[50px] relative'>
      <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]'>
        <form className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]' onSubmit={onSubmitHandler}>

          <div className='py-[10px]'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type="text" placeholder='First Name' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434]
                         bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px]'
              onChange={onChangeHandler} name='firstName' value={formData.firstName} required />

            <input type="text" placeholder='Last Name' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434]
                         bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px]'
              onChange={onChangeHandler} name='lastName' value={formData.lastName} required />
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="email" placeholder='Email' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434]
                         bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px]'
              onChange={onChangeHandler} name='email' value={formData.email} required />
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="text" placeholder='Street' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434]
                         bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px]'
              onChange={onChangeHandler} name='street' value={formData.street} required />
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="text" placeholder='City' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434]
                         bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px]'
              onChange={onChangeHandler} name='city' value={formData.city} required />
            <input type="text" placeholder='State' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434]
                         bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px]'
              onChange={onChangeHandler} name='state' value={formData.state} required />
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="text" placeholder='Pincode' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434]
                         bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px]'
              onChange={onChangeHandler} name='pincode' value={formData.pincode} required />
            <input type="text" placeholder='Country' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434]
                         bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px]'
              onChange={onChangeHandler} name='country' value={formData.country} required />
          </div>
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="tel" placeholder='Phone' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434]
                         bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px]'
              onChange={onChangeHandler} name='phone' value={formData.phone} required />
          </div>

          <div>
            <button
              type='submit'
              className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px]
                       rounded-2xl text-white flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[8%] right-[35%]
                       border-[1px] border-[#80808049] ml-[40px] mt-[30px] hover:bg-[#3bcee860] transition-colors'>
             {loading ? <Loading /> : "Place Order"}
            </button>
          </div>
        </form>
      </div>
      <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]'>
        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px]
           flex-col'>
          <CartTotal />
          <div className='py-[10px]'>
            <Title text1={'Payment'} text2={'Method'} />
          </div>
          <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]'>

            <button onClick={() => setMethod('razorpay')} className={`w-[150px] h-[50px] rounded-sm cursor-pointer bg-[white] 
            ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-md' : ''}`}>
              <img src={razorpay} alt="" />  </button>

            <button
              onClick={() => setMethod('Cash On Delivery')}
              className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[16px] px-[20px]
             rounded-sm text-[#332f6f] cursor-pointer font-semibold ${method === 'Cash On Delivery' ? 'border-[5px] border-blue-900 rounded-md' : ''}`}>
              Cash On Delivery
            </button>

          </div>
        </div>
      </div>
    </div>

  )
}

export default placeOrder
