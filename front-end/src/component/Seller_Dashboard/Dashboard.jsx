import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {

  const data = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 800 },
    { name: "Mar", sales: 600 },
    { name: "Apr", sales: 1200 },
    { name: "May", sales: 900 }
  ];

  return (
    <>
      <div>
        <div className='flex'>
          <div className='p-4'>
            <div className='p-2 shadow-md rounded-[15px] w-max border pr-10'>
              <div className='ml-8'>
                <h1 className='text-gray-500 font-semibold text-[1.2rem]'>Total Sales</h1>
                <h1 className='text-[2rem] text-green-600'>$1500</h1>
              </div>
              <div className="bg-white w-[20rem] h-[10rem] mt-2">
              <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className='p-4'>
            <div className='p-2 shadow-md rounded-[15px] w-max border pr-10'>
              <div className='ml-8'>
                <h1 className='text-gray-500 font-semibold text-[1.2rem]'>Total Orders</h1>
                <h1 className='text-[2rem] text-green-600'>120</h1>
              </div>
              <div className="bg-white w-[20rem] h-[10rem] mt-2">
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div>
        <div className='p-4'>
            <div className='p-2 shadow-md rounded-[15px] w-max border pr-10'>
              <div className='ml-8'>
                <h1 className='text-gray-500 font-semibold text-[1.2rem]'>Total Earnings</h1>
                <h1 className='text-[2rem] text-green-600'>$1250</h1>
              </div>
              <div className="bg-white w-[20rem] h-[10rem] mt-2">
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

// Recent Orders
// Low Stock Alerts