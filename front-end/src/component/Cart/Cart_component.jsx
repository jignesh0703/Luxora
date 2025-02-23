import axios from 'axios';
import React, { useContext } from 'react'
import { LuMinus, LuPlus } from "react-icons/lu";
import { StoreContext } from '../../context/Context';
import { toast } from 'react-toastify';

const Cart_component = ({ item, settrackcart, trackcart }) => {

  const { apiURL } = useContext(StoreContext)
  const CalculateRate = () => {
    if (!item.product_id.offer_price || !item.product_id.price) return
    const discount = ((item.product_id.price - item.product_id.offer_price) / item.product_id.price) * 100
    return Math.round(discount)
  }

  const RemoveCart = async (id) => {
    try {
      const response = await axios.delete(`${apiURL}/api/cart/remove/${id}`, {
        withCredentials: true
      })
      toast.success(response.data.message)
      settrackcart(!trackcart)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  const IncreaseCartQuantity = async (id) => {
    try {
      const response = await axios.post(`${apiURL}/api/cart/increase/${id}`, {}, {
        withCredentials: true
      })
      settrackcart(!trackcart)
      toast.success(response.data.message)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  const DecreaseCartQuantity = async (id) => {
    try {
      const response = await axios.post(`${apiURL}/api/cart/decrease/${id}`, {}, {
        withCredentials: true
      })
      settrackcart(!trackcart)
      toast.success(response.data.message)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <>
      <div className=''>
        <div className='px-6 pt-6 pb-4 flex gap-2'>
          <div className='w-[10rem] h-[7rem] p-2'>
            <img src={item.product_id.images[0]} alt="product_Image" className='w-full h-full object-center' />
          </div>
          <div className='w-[35rem]'>
            <div>
              <h1 className='mt-2 font-semibold truncate whitespace-nowrap overflow-hidden'>{item.product_id.name}</h1>
            </div>
            <div className='flex gap-2 mt-2 items-end'>
              <h1 className='font-semibold text-[1.1rem] text-gray-500 line-through'>₹{(item.product_id.price)?.toLocaleString('en-IN')}</h1> 
              <h1 className='font-semibold text-[1.5rem]'>₹{(item.product_id.offer_price)?.toLocaleString('en-IN')}</h1>
              <h1 className='font-semibold text-[1.1rem] text-[#388e3c]'>{CalculateRate()}% off</h1>
            </div>
          </div>
        </div>
        <div className='mt-0 px-6 flex gap-8 items-center'>
          <div className='flex gap-2'>
            <button
              className={`border w-[2rem] h-[2rem] rounded-full border-gray-400 flex justify-center items-center ${item.quantity === 1 && 'cursor-not-allowed'} `}
              onClick={() => DecreaseCartQuantity(item.product_id._id)}
              disabled={item.quantity === 1}
            >
              <LuMinus />
            </button>
            <button className='w-[3.5rem] h-[2rem] border border-gray-400 cursor-not-allowed' disabled>{item.quantity}</button>
            <button className='border w-[2rem] h-[2rem] rounded-full border-gray-400 flex justify-center items-center' onClick={() => IncreaseCartQuantity(item.product_id._id)}><LuPlus /></button>
          </div>
          <div className='font-semibold text-[1.2rem] cursor-pointer' onClick={() => RemoveCart(item.product_id._id)}>
            <h1>REMOVE</h1>
          </div>
        </div>
      </div>
      <hr className='w-full bg-gray-400 mt-4' />
    </>
  )
}

export default Cart_component