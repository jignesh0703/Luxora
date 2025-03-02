import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/Context'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import IndivisualReview from './IndivisualReview'
import { toast } from 'react-toastify'
import Add_Review from './Add_Review'

const Reviews = ({ Product_Data }) => {

    const { id } = useParams()
    const { apiURL, userdata } = useContext(StoreContext)
    const [AllReviwes, setAllReviwes] = useState(null)
    const [SawAddReview, setSawAddReview] = useState(false)
    const [trackreview, settrackreview] = useState(false)

    const FetchReviews = async () => {
        try {
            const response = await axios.get(`${apiURL}/api/rate/getproduct/:${id}`)
            setAllReviwes(response.data.FindproductReview)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }
    useEffect(() => {
        FetchReviews()
    }, [apiURL, id, trackreview])

    const CalculateRate = () => {
        if (!Product_Data?.price || !Product_Data?.offer_price) return
        const discount = ((Product_Data?.price - Product_Data?.offer_price) / Product_Data?.price) * 100
        return Math.round(discount)
    }

    const sawrateoption = () => {
        if (userdata) {
            setSawAddReview(true)
        } else {
            toast.error('Login is Reqiured!')
        }
    }

    return (
        <div className='mt-2'>
            <div className='w-[45rem]'>
                <h1 className='text-[1.2rem] font-serif'>{Product_Data?.name}</h1>
            </div>
            <div className='text-gray-400 mt-2'>
                <h1 className='font-semibold'>{AllReviwes?.length} Reviews</h1>
            </div>
            <div className='mt-2 flex gap-4 items-center'>
                <h1 className='font-semibold text-[2rem]'>₹{(Product_Data?.offer_price)?.toLocaleString('en-IN')}</h1>
                <h1 className='font-semibold text-[1.3rem] text-gray-500 line-through'>₹{(Product_Data?.price)?.toLocaleString('en-IN')}</h1>
                <h1 className='font-semibold text-[1.3rem] text-[#388e3c]'>{CalculateRate()}% off</h1>
            </div>
            <hr className='w-[45rem] rounded-full bg-gray-500 mt-2' />
            <div className='mt-4 w-[45rem]'>
                <h1 className='text-[1.2rem] font-bold'>Product Desciption</h1>
                <h1 className='font-medium mt-2'>{Product_Data?.description}</h1>
            </div>
            <hr className='w-[45rem] rounded-full bg-gray-500 mt-2' />
            <div className='mt-4 w-[45rem] flex justify-between'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-[1.2rem] font-bold'>Ratings & Reviews</h1>
                    <h1 className='font-semibold text-gray-400'>{AllReviwes?.length} Reviews</h1>
                </div>
                <button className='bg-[#2874f0] text-white font-bold p-1 px-2 cursor-pointer' onClick={sawrateoption}>Rate Product</button>
            </div>
            {
                SawAddReview && <div>
                    <Add_Review setSawAddReview={setSawAddReview} settrackreview={settrackreview} trackreview={trackreview} />
                </div>
            }

            <div className='border border-gray-300 border-b-0 mt-4'>
                {
                    AllReviwes && AllReviwes.map((item, index) => {
                        return <IndivisualReview review={item.review} username={item.user_id.username} key={index} />
                    })
                }
                {
                    AllReviwes.length === 0 && <h1 className='py-[2rem] flex justify-center text-[1.5rem] font-semibold'>No Reviews are added</h1>
                }
            </div>
        </div>
    )
}

export default Reviews