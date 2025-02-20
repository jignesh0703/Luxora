import React from 'react'

const Reviews = ({ Product_Data }) => {

    const CalculateRate = () => {
        if (!Product_Data?.price || !Product_Data?.offer_price) return
        const discount = ((Product_Data?.price - Product_Data?.offer_price) / Product_Data?.price) * 100
        return Math.round(discount)
    }

    return (
        <div className='mt-2'>
            <div className='w-[45rem]'>
                <h1 className='text-[1.2rem] font-serif'>{Product_Data?.name}</h1>
            </div>
            <div className='text-gray-400 mt-2'>
                <h1 className='font-semibold'>3,625 Ratings & 293 Reviews</h1>
            </div>
            <div className='mt-2 flex gap-4 items-center'>
                <h1 className='font-semibold text-[2rem]'>₹{(Product_Data?.offer_price)?.toLocaleString('en-IN')}</h1>
                <h1 className='font-semibold text-[1.3rem] text-gray-500 line-through'>₹{(Product_Data?.price)?.toLocaleString('en-IN')}</h1>
                <h1 className='font-semibold text-[1.3rem] text-[#388e3c]'>{CalculateRate()}% off</h1>
            </div>
            <hr className='w-[45rem] rounded-full bg-gray-500 mt-2' />
            <div className='mt-4 w-[45rem]'>
                <h1 className='text-[1.2rem] font-bold'>Product Desciption</h1>
                <h1 className='font-medium mt-2'>{Product_Data?.description}</h1>
            </div>
            <hr className='w-[45rem] rounded-full bg-gray-500 mt-2' />
            <div className='mt-4 w-[45rem] flex justify-between'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-[1.2rem] font-bold'>Ratings & Reviews</h1>
                    <h1 className='font-semibold text-gray-400'>3,625 Ratings & 293 Reviews</h1>
                </div>
                <button className='bg-[#2874f0] text-white font-bold p-1 px-2 cursor-pointer'>Rate Product</button>
            </div>
        </div>
    )
}

export default Reviews