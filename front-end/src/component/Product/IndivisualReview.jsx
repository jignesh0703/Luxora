import React from 'react'
import { IoPersonCircle } from "react-icons/io5";

const IndivisualReview = ({ review, username }) => {
    return (
        <>
            <div className='mt-[1rem] flex gap-[1rem] py-2 border-b border-gray-300 px-4'>
                <IoPersonCircle className='text-[2.5rem] text-gray-400' />
                <div className=''>
                    <h1 className='font-semibold'>{username}</h1>
                    <h1 className='mt-1 w-[38rem] break-words'>{review}</h1>
                </div>
            </div>
        </>
    )
}

export default IndivisualReview