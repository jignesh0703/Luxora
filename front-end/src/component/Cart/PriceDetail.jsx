import React from 'react'

const PriceDetail = ({ CartData }) => {

    const TotalPrice = CartData.reduce((total, item) => total + item.product_id.offer_price * item.quantity, 0)

    const Discount = Math.round(TotalPrice * 0.1)

    const SecureIcon = <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        width={31} height={38} viewBox="0 0 31 38">
        <title>shield (1)</title>
        <defs>
            <path d="M14.436 0L0 6.545v9.82C0 25.444 6.16 33.937 14.436 36c8.277-2.062 14.436-10.555 14.436-19.636v-9.82L14.436 0z" id="a" />
            <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="b" >
                <feOffset dx={1} dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur stdDeviation=".5" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" in="shadowBlurOuter1" />
            </filter>
            <path d="M13.436.394L.863 6.07v8.51c0 7.875 5.364 15.238 12.573 17.026 7.208-1.788 12.573-9.15 12.573-17.025V6.07L13.435.393z" id="d" />
        </defs>
        <g fill="none" fillRule="evenodd">
            <mask id="c" fill="#fff"><use xlinkHref="#a" /></mask>
            <use fill="#000" filter="url(#b)" xlinkHref="#a" />
            <use fill="#FFF" xlinkHref="#a" />
            <g transform="translate(1 2)" mask="url(#c)">
                <mask id="e" fill="#fff"><use xlinkHref="#d" /></mask>
                <use fill="#676767" xlinkHref="#d" />
                <path stroke="#FFF" strokeWidth={2} mask="url(#e)" d="M7.376 15.484l3.81 3.547L20 10.218" />
            </g>
            <path fill="#000" opacity=".02" mask="url(#c)" d="M14.5-1h16v38h-16z" />
        </g></svg>

    return (
        <>
            <div className='flex flex-col'>
                <div className='bg-white mt-4 h-max w-[25rem] shadow-md'>
                    <div>
                        <div className='flex text-gray-400 font-bold text-[1.2rem] p-2 px-8 border-b'>
                            <h1>PRICE DETAILS</h1>
                        </div>
                        <div className='flex flex-col p-2 px-8 w-[25rem]'>
                            <div className='flex justify-between w-full font-semibold text-[1.1rem]'>
                                <h1>Price ({CartData.length} items)</h1>
                                <h1>₹{(TotalPrice)?.toLocaleString('en-IN')}</h1>
                            </div>
                            <div className='flex justify-between w-full font-semibold text-[1.1rem] mt-4'>
                                <h1>Discount</h1>
                                <h1 className='text-[#388e3c]'>-₹{(Discount)?.toLocaleString('en-IN')}</h1>
                            </div>
                            <div className='flex justify-between w-full font-semibold text-[1.1rem] mt-4'>
                                <h1>Delivery Charges</h1>
                                <div className='flex gap-2'>
                                    <h1 className='line-through text-gray-400'>₹40</h1>
                                    <h1 className='text-[#388e3c]'>Free</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 px-8'>
                        <div className='border border-gray-300 border-dashed py-4 border-l-0 border-r-0 flex justify-between font-bold text-[1.2rem]'>
                            <h1>Total Amount</h1>
                            <h1>₹{(TotalPrice - Discount)?.toLocaleString('en-IN')}</h1>
                        </div>
                    </div>
                    <div className='p-2 px-8 font-semibold text-[1.1rem] text-[#388e3c]'>
                        <h1>You will save ₹{(Discount + 40)?.toLocaleString('en-IN')} on this order</h1>
                    </div>
                </div>
                <div className='mt-6 ml-4 flex items-center gap-4'>
                    <div>
                        <h1>{SecureIcon}</h1>
                    </div>
                    <div className='font-bold text-gray-400 w-[22rem] text-[.9rem]'>
                        Safe and Secure Payments.Easy returns.100% Authentic product
                    </div>
                </div>
            </div>
        </>
    )
}

export default PriceDetail