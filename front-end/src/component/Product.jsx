import React from 'react'
import product1 from '../images/product1_img1.png'

const Product = () => {
    return (
        <div className=''>
            <div>
                <img src={product1} alt="products" className='w-[12rem] h-[15rem] object-cover' />
            </div>
            <div className='w-[12rem]'>
                <h1>Men Regular Fit Solid Spread Collar Casual Shirt</h1>
            </div>
        </div>

    )
}

export default Product