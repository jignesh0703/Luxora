import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/Context'
import Address from '../component/Place_Order/Address'
import Payment from '../component/Place_Order/Payment'
import Order_Summary from '../component/Place_Order/Order_Summary'
import Error from '../component/Error'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Oval } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom'

const Place_Order = () => {

  const Navigate = useNavigate()
  const { apiURL, Place_Orders, isCartUsed } = useContext(StoreContext)
  const [isLoading, setisLoading] = useState(false)
  const [getAddress, setgetAddress] = useState(null)
  const products = Array.isArray(Place_Orders) ? Place_Orders : [Place_Orders]
  const [formdata, setformdata] = useState({
    holdername: '',
    card_number: '',
    exipry_date: '',
    cvv: ''
  })

  const SubmitHandler = async (e) => {
    e.preventDefault()
    setisLoading(true)
    if (formdata.card_number.length !== 16) {
      return toast.error('Card Number must be exactly 16 digits')
    }
    if (formdata.cvv.length !== 3) {
      return toast.error('Card Number must be exactly 3 digits')
    }
    if(!getAddress){
      return toast.error('Please add address')
    }
    setformdata({
      holdername: '',
      card_number: '',
      exipry_date: '',
      cvv: ''
    })

    try {
      const response = await axios.post(`${apiURL}/api/order/add`, { iscart: isCartUsed, address_id: getAddress, formdata: formdata.holdername, products }, {
        withCredentials: true
      })
      toast.success(response.data.message)
      Navigate('/')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
    setisLoading(false)
  }

  return (
    <>
      {
        isLoading && <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-50 z-50">
          <Oval type="Oval" color="#00BFFF" height={50} width={50} />
        </div>
      }
      {
        !Place_Orders && <Error />
      }
      <div className='bg-[#f1f3f6] min-h-screen flex justify-center gap-4'>
        <div>
          <div className='flex justify-center'>
            <Address setgetAddress={setgetAddress} />
          </div>
          <div className='flex justify-center mt-4'>
            <Payment formdata={formdata} setformdata={setformdata} SubmitHandler={SubmitHandler} />
          </div>
        </div>
        <div>
          <div className='flex justify-center mt-4'>
            <Order_Summary products={products} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Place_Order