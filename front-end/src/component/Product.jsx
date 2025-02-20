import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ id, name, images }) => {
    return (
        <Link to={`/product/${id}`}>
            <div className=''>
                <div>
                    <img src={images[0]} alt="products" className='w-[12rem] h-[15rem] object-cover' />
                </div>
                <div className='w-[12rem]'>
                    <h1 className='w-[12] truncate whitespace-nowrap overflow-hidden'>{name}</h1>
                </div>
            </div>
        </Link>
    )
}

export default Product