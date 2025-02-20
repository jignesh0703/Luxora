import React from 'react'
import Charts from './Charts';
import Recent_Orders from './Recent_Orders';
import All_StatusColor from './All_StatusColor';

const Dashboard = () => {

  const data = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 800 },
    { name: "Mar", sales: 600 },
    { name: "Apr", sales: 1200 },
    { name: "May", sales: 900 }
  ];

  const statusColors = {
    processing: "bg-yellow-500",
    shipped: "bg-blue-500",
    outForDelivery: "bg-orange-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };

  return (
    <>
      <div>
        <div className='flex'>
          <Charts data={data} name={'Total Sales'} />
          <Charts data={data} name={'Total Orders'} />
        </div>
        <div>
          <Charts data={data} name={'Total Earnings'} />
          <div className='p-4'>
            <div className='p-2 rounded-[15px] w-max ml-[2rem]'>
              <h1 className='font-bold text-[1.2rem]'>Recent Orders</h1>
              <div className='mt-4'>
                <div className='flex w-max font-bold'>
                  <h1 className='w-[12rem]'>Name</h1>
                  <h1 className='w-[12rem]'>Date</h1>
                  <h1 className='w-[12rem]'>Price</h1>
                  <h1 className='w-[5rem]'>Status</h1>
                </div>
              </div>
              <Recent_Orders status='outForDelivery' statusColors={statusColors} />
              <All_StatusColor statusColors={statusColors} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard