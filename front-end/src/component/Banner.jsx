import React, { useEffect, useState } from 'react'
import banner1 from '../images/banner1.png'
import banner2 from '../images/banner2.png'
import banner3 from '../images/banner3.png'
import banner4 from '../images/banner4.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Banner = () => {

    const banners = [banner1, banner2, banner3, banner4]
    const [MainBanner, setMainBanner] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setMainBanner((prev) => (prev + 1) % banners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [banners.length]);

    const NextBanner = () => {
        setMainBanner((prev) => (prev + 1) % banners.length)
    }

    const PrevBanner = () => {
        setMainBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
    }

    const DotHandler = (index) => {
        setMainBanner(index)
    }

    return (
        <>
            <div className='flex w-full h-max justify-center items-center flex-col'>
                <div className='w-[80%] mt-4'>
                    <img src={banners[MainBanner]} alt="banners" className='w-full h-[15rem]' />
                </div>
                <div className='absolute flex justify-between w-[80%] bg-transparent'>
                    <button className='w-[2.5rem] h-[5rem] bg-slate-100 rounded-br-[5px] rounded-tr-[5px] flex justify-center items-center text-[1.2rem] text-[#555555]' onClick={PrevBanner} ><FaAngleLeft /></button>
                    <button className='w-[2.5rem] h-[5rem] bg-slate-100 rounded-bl-[5px] rounded-tl-[5px] flex justify-center items-center text-[1.2rem] text-[#555555]' onClick={NextBanner}><FaAngleRight /></button>
                </div>
                <div className='mt-2 flex'>
                    {
                        banners.map((_,index) => {
                            return <div
                                key={index}
                                onClick={()=>DotHandler(index)}
                                className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${MainBanner === index ? 'bg-blue-500' : 'bg-gray-400'}`}
                            />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Banner