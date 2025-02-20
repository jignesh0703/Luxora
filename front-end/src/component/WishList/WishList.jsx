import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { StoreContext } from '../../context/Context';
import { toast } from 'react-toastify';

const WishList = ({ item, trackwishlist, settrackwishlist }) => {

    const { apiURL } = useContext(StoreContext)
    const CalculateRate = () => {
        if (!item.product_id.price || !item.product_id.offer_price) return
        const discount = ((item.product_id.price - item.product_id.offer_price) / item.product_id.price) * 100
        return Math.round(discount)
    }

    const RemoveWishList = async () => {
        try {
            const response = await axios.delete(`${apiURL}/api/wishlist/remove/${item._id}`, {
                withCredentials: true
            })
            settrackwishlist(!trackwishlist)
            toast.success(response.data.message)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <>
            <div className='flex gap-[3rem] p-4 px-10 border-b group'>
                <Link to={`/product/${item.product_id._id}`} className='w-[8rem] h-[8rem] border object-cover'>
                    <img src={item.product_id.images[0]} alt="product_image" className='w-full h-full' />
                </Link>
                <div className='flex justify-between w-full'>
                    <div>
                        <Link to={`/product/${item.product_id._id}`}>
                            <h1 className='w-[25rem] truncate font-semibold group-hover:text-blue-600 duration-200 cursor-pointer'>{item.product_id.name}</h1>
                        </Link>
                        <div className='flex gap-3 mt-2 items-center'>
                            <h1 className='font-bold text-[1.5rem]'>₹{(item.product_id.price)?.toLocaleString('en-IN')}</h1>
                            <h1 className='text-gray-500 line-through font-semibold'>₹{(item.product_id.offer_price)?.toLocaleString('en-IN')}</h1>
                            <h1 className='text-[#388e3c] font-bold text-[.8rem]'>{CalculateRate()}% OFF</h1>
                        </div>
                    </div>
                    <div className='flex text-[1.5rem] cursor-pointer w-max h-max text-gray-400' onClick={() => RemoveWishList()}>
                        <MdDelete />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishList