import React from 'react'

const All_StatusColor = ({ statusColors }) => {
    return (
        <div className='mt-4'>
            <div className='flex items-center gap-4'>
                <span className={`w-3 h-3 rounded-full ${statusColors['Processing']}`}></span>
                <h1>Processing</h1>
            </div>
            <div className='flex items-center gap-4 mt-2'>
                <span className={`w-3 h-3 rounded-full ${statusColors['Shipped']}`}></span>
                <h1>Shipped</h1>
            </div>
            <div className='flex items-center gap-4 mt-2'>
                <span className={`w-3 h-3 rounded-full ${statusColors['OutForDelivery']}`}></span>
                <h1>OutForDelivery</h1>
            </div>
            <div className='flex items-center gap-4 mt-2'>
                <span className={`w-3 h-3 rounded-full ${statusColors['Delivered']}`}></span>
                <h1>Delivered</h1>
            </div>
            <div className='flex items-center gap-4 mt-2'>
                <span className={`w-3 h-3 rounded-full ${statusColors['Cancelled']}`}></span>
                <h1>Cancelled</h1>
            </div>
        </div>
    )
}

export default All_StatusColor