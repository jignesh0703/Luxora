import React from 'react'

const Recent_Orders = ({ Order_Data, statusColors }) => {

    return (
        <>
            {
                Order_Data && Order_Data.slice(0, 5).map((item, index) => {
                    return <div className='mt-4' key={index}>
                        <div className='flex w-max font-bold text-gray-400 items-center'>
                            <h1 className='w-[12rem]'>{index + 1}</h1>
                            <h1 className='w-[12rem]'>{new Date(item.createdAt).toLocaleDateString('en-IN')}</h1>
                            <h1 className='w-[12rem]'>₹{(item.total_price).toLocaleString('en-IN')}</h1>
                            <span className={`w-3 h-3 rounded-full ml-[1rem] ${statusColors[item?.orderStatus]}`}></span>
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default Recent_Orders