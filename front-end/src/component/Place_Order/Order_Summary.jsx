import React from 'react'
import { IoBagOutline } from "react-icons/io5";

const Order_Summary = ({ products }) => {

    const totalPrice = products?.reduce(
        (acc, item) => acc + (item?.quantity || 1) * (item?.offer_price || item?.product_id?.offer_price),
        0
    );

    return (
        <div className='mt-4 bg-white shadow-md p-4 px-8 w-[30rem]'>
            <div className='flex gap-2 w-full'>
                <IoBagOutline className='text-[1.4rem]' />
                <h1 className='font-bold text-gray-400'>YOUR ORDER SUMMAEY</h1>
            </div>
            <div className='flex flex-col mt-4'>
                <div className='flex'>
                    <h1 className='w-[15rem] font-medium'>ITEMS DESCRIPTION</h1>
                    <h1 className='w-[5rem] text-center font-medium'>QUANTITY</h1>
                    <h1 className='w-[7rem] text-center font-medium'>PRICE</h1>
                </div>
                <div className='flex flex-col gap-2 my-4'>
                    {
                        products && products.map((item, index) => {
                            const Calculateprice = () => {
                                return (item?.quantity || 1) * (item?.offer_price || item?.product_id?.offer_price)
                            }
                            return <div className='flex' key={index}>
                                <h1 className='w-[15rem] font-medium truncate'>{item?.name || item?.product_id?.name}</h1>
                                <h1 className='w-[5rem] text-center font-medium'>{(item?.quantity || 1)}</h1>
                                <h1 className='w-[7rem] text-end mr-6 font-medium'>₹{(Calculateprice()).toLocaleString('en-IN')}</h1>
                            </div>
                        })
                    }
                </div>
                <div className='border-t flex justify-between pl-[8rem] gap-4 mr-6 pt-2 font-semibold'>
                    <h1>SHIPPING CHARGES</h1>
                    <h1>FREE</h1>
                </div>
                <div className='flex justify-between pl-[8rem] gap-4 mr-6 pt-2 font-semibold'>
                    <h1 className='text-[1.2rem] font-bold'>Total</h1>
                    <h1 className='text-[1.2rem] font-bold'>₹{(totalPrice).toLocaleString('en-IN')}</h1>
                </div>
            </div>
        </div>
    )
}

export default Order_Summary