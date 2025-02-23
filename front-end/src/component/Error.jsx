import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {

    const Navigate = useNavigate()

    return (
        <>
            <div className='black_overlay w-full h-screen top-0 fixed flex justify-center'>
                <div className='bg-white w-[25rem] h-[10rem] mt-[10rem] rounded-[5px]'>
                    <div className='font-bold flex justify-center mt-[3rem]'>
                        <h1>Data is expired,  Please place your order again.</h1>
                    </div>
                    <div className='flex justify-center mt-[1rem]'>
                        <button className='border p-2 px-4 bg-[#2874f0] font-semibold text-white font-serif' onClick={() => Navigate('/')}>Go Back</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error