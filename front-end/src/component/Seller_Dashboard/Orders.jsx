import React from 'react'

const Orders = ({ Order_Data }) => {

  const statusColors = {
    Processing: "bg-yellow-500",
    Shipped: "bg-blue-500",
    OutForDelivery: "bg-orange-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  return (
    <>
      <h1 className='flex justify-center mt-4 text-[1.7rem] font-bold'>Orders</h1>
      <div className='p-8'>
        <div className='flex w-max font-bold items-center'>
          <h1 className='w-[12rem]'>ID</h1>
          <h1 className='w-[12rem]'>Date</h1>
          <h1 className='w-[12rem]'>Price</h1>
          <h1 className='w-[15rem]'>Status</h1>
        </div>
        {
          Order_Data && Order_Data.map((item, index) => {
            return <div className='flex w-max font-bold text-gray-400 items-center mt-4' key={index}>
              <h1 className='w-[12rem]'>{index + 1}</h1>
              <h1 className='w-[12rem]'>{new Date(item.createdAt).toLocaleDateString('en-IN')}</h1>
              <h1 className='w-[10rem]'>₹{(item.total_price).toLocaleString('en-IN')}</h1>
              <div className='flex gap-2 items-center'>
                <span className={`w-3 h-3 rounded-full ml-[1rem] ${statusColors[item?.orderStatus]}`}></span>
                <h1 className='w-[15rem]'>{item?.orderStatus}</h1>
              </div>
            </div>
          })
        }
      </div>
    </>
  )
}

export default Orders