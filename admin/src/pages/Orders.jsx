import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useEffect } from 'react'
import { SiEbox } from "react-icons/si";


function Orders() {
  let [orders, setOrders] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/orderlist', {},
        { withCredentials: true })
      setOrders(result.data.reverse())

    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  }

  const statusHandler = async (e, orderId) => {
     const newStatus = e.target.value;
    try {
      const result = await axios.post(serverUrl + '/api/order/orderstatus', {orderId, status:newStatus},
        {withCredentials: true})
        if(result.data) {
           await fetchAllOrders();
        }
      
    } catch (error) {
      console.log("Error updating order status:", error);

    }
  }



  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='w-[100vw] min-h-[100vh] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />

      <div className='w-[100%] h-[100%] flex items-center lg:justify-start justify-center'>
        <Sidebar />
        <div className='lg:w-[85%] md:w-[70%] h-[100%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[30px]
              overflow-x-hidden py-[50px] ml-[100px]'>
          <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white'>
            All Orders Lists
          </div>

          <div className="flex flex-col gap-[20px]">
            {
              orders.map((order, index) => (
                <div className='w-[90%] min-h-[200px] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between
                      flex-col lg:flex-row p-[10px] md:px-[20px] gap-[10px]' key={index}>

                  <SiEbox className='w-[60px] h-[60px] text-[black] p-[5px] rounded-lg bg-white' />

                  <div className='flex-1'>
                    <div className='flex items-center justify-center flex-col gap-[5px] text-[16px] text-[#56dbfc]'>
                      {
                        order.items.map((item, itemIndex) => {
                          if (itemIndex === order.items.length - 1) {
                            return (
                              <p key={itemIndex}>
                                {item.name.toUpperCase()} , {item.quantity} <span>({item.size})</span>
                              </p>
                            )
                          }
                          else {
                            return (
                              <p key={itemIndex}>
                                {item.name.toUpperCase()} , {item.quantity} <span>({item.size})</span>,
                              </p>
                            )
                          }
                        })
                      }
                    </div>
                  </div>

                  {/* Order Details Section */}
                  <div className='flex flex-col gap-[15px] text-white mr-[30px]'>
                    <div className='text-[14px]'>
                      <p><span className='text-[#56dbfc]'>Name:</span> {order.address.firstName} {order.address.lastName}</p>
                      <p><span className='text-[#56dbfc]'>Email:</span> {order.address.email}</p>
                      <p><span className='text-[#56dbfc]'>Phone:</span> {order.address.phone}</p>
                      <p><span className='text-[#56dbfc]'>Address:</span> {order.address.street}, {order.address.city}</p>
                      <p><span className='text-[#56dbfc]'>State:</span> {order.address.state}, {order.address.country}</p>
                      <p><span className='text-[#56dbfc]'>Pincode:</span> {order.address.pincode}</p>
                    </div>
                  </div>

                  {/* Order Status and Amount Section */}
                  <div className='flex flex-col gap-[5px]  items-start text-green-100'>

                    <p className='text-white text-bold'>Price: {order.amount}₹</p>
                    <p>Items: {order.items.length}</p>
                    <p>Method: {order.paymentMethod}</p>
                    <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>

                  <select className='bg-slate-500 text-white px-[10px] py-[5px] rounded-md text-[12px] cursor-pointer'
                    value={order.status} onChange={(e)=> statusHandler(e,order._id)}>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders