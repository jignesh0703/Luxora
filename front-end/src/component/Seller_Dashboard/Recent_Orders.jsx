import React from 'react'

const Recent_Orders = ({ status, statusColors }) => {

    return (
        <>
            <div className='mt-4'>
                <div className='flex w-max font-bold text-gray-400 items-center'>
                    <h1 className='w-[12rem]'>Jigneshx_04</h1>
                    <h1 className='w-[12rem]'>24/07/2024</h1>
                    <h1 className='w-[12rem]'>$200</h1>
                    <span className={`w-3 h-3 rounded-full ml-[1rem] ${statusColors[status]}`}></span>
                </div>
            </div>
        </>
    )
}

export default Recent_Orders