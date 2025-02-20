import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Charts = ({ data, name }) => {
    return (
        <div className='p-4'>
            <div className='p-2 shadow-md rounded-[15px] w-max border pr-10'>
                <div className='ml-8'>
                    <h1 className='text-gray-500 font-semibold text-[1.2rem]'>{name}</h1>
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
    )
}

export default Charts