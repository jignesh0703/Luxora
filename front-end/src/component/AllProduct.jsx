import React from 'react'
import Product from './Product'

const AllProduct = () => {
    return (
        <div className='w-[100%] flex justify-center mt-4'>
            <div className='flex w-[80%] gap-[1.8rem] flex-wrap'>
                <Product />
            </div>
        </div>
    )
}

export default AllProduct