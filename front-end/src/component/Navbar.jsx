import React, { useContext, useEffect, useRef, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineStorefront } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/Context';
import { toast } from 'react-toastify';

const Navbar = () => {

  const [sawmodechange, setsawmodechange] = useState(false)
  const modechange = useRef(null)
  const { userdata } = useContext(StoreContext)
  const Navigate = useNavigate()

  useEffect(() => {
    const HandleClickOutSide = (event) => {
      if (modechange.current && !modechange.current.contains(event.target)) {
        setsawmodechange(false)
      }
    }
    document.addEventListener('mousedown', HandleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', HandleClickOutSide);
    };
  }, [])


  return (
    <div className='flex justify-center gap-4 sm:gap-[3rem] items-center bg-[#131921] py-2'>
      <Link to='/'><h1 className='text-[1.5rem] font-bold italic text-white hidden sm:flex'>
        Luxora
      </h1></Link>
      <div className='border border-black rounded-[10px] flex items-center'>
        <input type="text" placeholder='Search in Luxora' className='w-[12rem] sm:w-[15rem] md:w-[18rem] lg:w-[30rem] xl:w-[35rem] 2xl:w-[50rem] h-[2.5rem] border-r border-black rounded-s-[10px] pl-4 outline-none' />
        <button className='bg-[#FFFF90] hover:bg-[#DAA520] duration-300 h-[2.5rem] rounded-e-[10px] w-[3rem] flex justify-center items-center text-[1.5rem]'><CiSearch /></button>
      </div>
      <div className='flex gap-2 sm:gap-2 lg:gap-4'>
        {
          userdata?.user
            ? <Link to='/profile'><button className='flex justify-center items-center text-white gap-2 hover:border border-white px-2 rounded-[10px] font-semibold group text-[1.1rem] py-1'>
              <CgProfile className='text-[1.5rem]' />
              <h1 className='hidden sm:flex'>{userdata?.user.username}</h1>
              <FaChevronDown className='group-hover:rotate-180 transition duration-500 text-base hidden sm:flex' />
            </button></Link>
            : <Link to='/login'><button className='flex justify-center items-center text-white gap-2 hover:border border-white px-2 rounded-[10px] font-semibold group text-[1.1rem] py-1'>
              <CgProfile className='text-[1.5rem]' />
              <h1 className='hidden sm:flex'>Login</h1>
              <FaChevronDown className='group-hover:rotate-180 transition duration-500 text-base hidden sm:flex' />
            </button></Link>
        }
        <button className='hidden md:flex justify-center items-center text-white hover:border border-white px-2 rounded-[10px] font-semibold gap-2 text-[1.1rem] py-1'
          onClick={() => {
            if (userdata?.user) {
              Navigate('/cart')
            } else {
              toast.error('Login Required!')
            }
          }}
        >
          <IoCartOutline className='text-[1.5rem]' />
          <h1 className='hidden xl:flex'>Cart</h1>
        </button>
        {
          userdata?.user?.isSeller
            ? <button className='justify-center items-center text-white hover:border border-white px-2 rounded-[10px] font-semibold gap-2 text-[1.1rem] py-1 hidden lg:flex'
              onClick={() => { Navigate('/dashboard') }}
            >
              <MdOutlineStorefront className='text-[1.5rem]' />
              <h1 className='hidden xl:flex'>Seller Dashboard</h1>
            </button>
            : <button className='justify-center items-center text-white hover:border border-white px-2 rounded-[10px] font-semibold gap-2 text-[1.1rem] py-1 hidden lg:flex'
              onClick={() => {
                if (userdata?.user) {
                  Navigate('/seller')
                } else {
                  toast.error('Login Required!')
                }
              }}
            >
              <MdOutlineStorefront className='text-[1.5rem]' />
              <h1 className='hidden xl:flex'>Become a Seller</h1>
            </button>
        }
        <div className='text-white text-[1.2rem] hover:border border-white px-1 rounded-[10px] flex justify-center items-center cursor-pointer' onClick={() => setsawmodechange(!sawmodechange)}>
          <HiDotsVertical />
          {
            sawmodechange
            && <div className='absolute bg-white text-black px-2 shadow-xl rounded-[5px] py-1 mt-[7rem] ml-[-10rem] xl:mt-14 xl:ml-[-5.5rem] flex flex-col' onClick={() => setsawmodechange(false)} ref={modechange}>
              <button className='font-semibold hover:bg-slate-200 rounded-[5px]'>Light Mode</button>
              <hr className='bg-black w-[90%] h-[2px] rounded-full flex justify-center items-center ml-[5%] xl:hidden' />
              <button className='justify-center items-center text-black px-2 font-semibold gap-2 py-1 flex xl:hidden hover:bg-slate-200 rounded-[5px]'>
                <MdOutlineStorefront className='text-[1.2rem]' />
                <h1 className='flex text-[1.1rem]'>Become a Seller</h1>
              </button>
              <hr className='bg-black w-[90%] h-[2px] rounded-full flex justify-center items-center ml-[5%] xl:hidden' />
              <button className='flex justify-center items-center text-black px-2 font-semibold gap-2 text-[1.1rem] py-1 xl:hidden hover:bg-slate-200 rounded-[5px]'
                onClick={() => {
                  if (userdata?.user) {
                    Navigate('/cart')
                  } else {
                    toast.error('Login Required!')
                  }
                }}
              >
                <IoCartOutline className='text-[1.5rem]' />
                <h1 className='flex'>Cart</h1>
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar