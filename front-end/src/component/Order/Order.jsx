import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/Context'
import axios from 'axios'

const Order = () => {

    const { apiURL, userdata } = useContext(StoreContext)
    const [Order_Data, setOrder_Data] = useState(null)
    const FetchOrder = async () => {
        try {
            const response = await axios.get(`${apiURL}/api/order/getuser`, {
                withCredentials: true
            })
            console.log(response.data.FindOrders)
            setOrder_Data(response.data.FindOrders)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }
    useEffect(() => {
        if (userdata) {
            FetchOrder()
        }
    }, [userdata])

    return (
        <div className='bg-white w-[60rem] h-max mt-[2rem] shadow-md p-4'>
            <div className='flex w-full justify-center text-[1.3rem] font-bold'>
                <h1>My Orders</h1>
            </div>
            <div className='mt-[1rem] px-4'>
                <div className='flex font-semibold border-b pb-2'>
                    <h1 className='w-[20rem]'>Name</h1>
                    <h1 className='w-[10rem]'>Quantity</h1>
                    <h1 className='w-[10rem]'>Total Price</h1>
                    <h1 className='w-[15rem]'>Payment Status</h1>
                    <h1 className='w-[10rem]'>order at</h1>
                </div>
            </div>
            {
                Order_Data
                    ? (
                        Order_Data.map((item, index) => {
                            return <div className='mt-[1rem] px-4' key={index}>
                                <div className='flex font-semibold border-b pb-2'>
                                    <div className='w-[20rem] flex gap-4'>
                                        <img src={item.products?.product_id?.images[0]} alt="products_image" className='w-[3rem]' />
                                        <h1 className='w-[16rem] truncate'>{item.products?.product_id?.name}</h1>
                                    </div>
                                    <h1 className='w-[10rem] pl-[2.5rem]'>{item?.products?.quantity}</h1>
                                    <h1 className='w-[10rem]'>₹{(item?.total_price).toLocaleString('en-IN')}</h1>
                                    <h1 className='w-[15rem]'>{item?.orderStatus}</h1>
                                    <h1 className='w-[10rem]'>
                                        {new Date(item?.createdAt).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </h1>
                                </div>
                            </div>
                        })
                    )
                    : <h1 className='w-full text-[2rem] font-bold py-[3rem] flex justify-center'>Not Ordered yet</h1>
            }
        </div>
    )
}

export default Order