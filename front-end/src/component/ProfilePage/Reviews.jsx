import React from 'react'
import ReviewsEmpty from '../../images/ReviewsEmpty.png'

const Reviews = () => {
  return (
    <div className='w-full h-full flex flex-col gap-8 justify-center items-center'>
      <div className='w-full flex justify-center'>
        <img src={ReviewsEmpty} alt="ReviewsEmpty_image" className='w-max'/>
      </div>
      <div className='flex gap-2 flex-col text-center'>
        <h1 className='font-bold text-[1.2rem]'>No Reviews & Ratings</h1>
        <h1>You have not rated or reviewed any product yet!</h1>
      </div>
    </div>
  )
}

export default Reviews