
import { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext.jsx'
import Title from '../components/Title.jsx'


function CartTotal() {

    const{currency, delivery_fee, getCartAmmount} = useContext(shopDataContext)

  

  return (
    <div className='w-full lg:ml-[30px]'>
        <div className='text-xl py-[10px]'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890] '>
            <div className='flex items-center justify-between text-white text-[18px] p-[10px]'>
                <p>Subtotal</p>
                <p>{currency} {getCartAmmount()}.00</p>
            </div>
             <hr />
            <div className='flex items-center justify-between text-white text-[18px] p-[10px]'>
                <p>Delivery Fee</p>
                <p>{currency} {delivery_fee}</p>
            </div>
            <hr />
            <div className='flex items-center justify-between text-white text-[18px] p-[10px]'>
                <b>Total</b>
                <b>{currency} {getCartAmmount()=== 0 ? 0 : getCartAmmount() + delivery_fee}</b>
            </div>
        </div>

    </div>
  )
}

export default CartTotal