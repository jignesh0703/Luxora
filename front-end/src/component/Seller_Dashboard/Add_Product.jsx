import React from 'react'
import { Link } from 'react-router-dom'

const Add_Product = () => {
  return (
    <>
        <div className='w-full h-full flex justify-center items-center mt-[3rem] flex-col'>
        <div className='p-4 border border-slate-300 rounded-[10px] flex justify-center'>
          <form className='w-[19rem]'>
            <h1 className='text-[2rem] font-bold'>Sign Up</h1>
            <div>
              <div className='flex flex-col'>
                <label htmlFor="email" className='font-bold'>Enter Email</label>
                <input
                  type="email"
                  name='email'
                  className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="email" className='font-bold'>Enter Username</label>
                <input
                  type="text"
                  name='username'
                  className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className='font-bold'>Enter Password</label>
                <input
                  type="password"
                  name='password'
                  className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                  required
                />
              </div>
              <div className='mt-2 font-semibold text-[.8rem]'>
                <p>To verify your email, we will send you a text message with a temporary code.</p>
              </div>
              <div className='mt-1'>
                <button className='w-[18rem] py-1 rounded-[5px] bg-yellow-500 font-bold'>Cintinue</button>
              </div>
              <div>
                <h1 className='text-[0.8rem]'>By continuing, you agree to Luxora's <a className='text-[#006aaf] border-b border-[#006aaf] cursor-pointer'>Conditions of Use</a> and <a className='text-[#006aaf] border-b border-[#006aaf] cursor-pointer'>Privacy Notice.</a></h1>
              </div>
            </div>
          </form>
        </div>
        <div className='flex justify-center items-center gap-2 mt-2'>
          <hr className='bg-slate-400 w-[6rem] h-[2px] rounded-full flex justify-center items-center' />
          <h1 className='flex justify-center items-center text-center'>Already have a account?</h1>
          <hr className='bg-slate-400 w-[6rem] h-[2px] rounded-full flex justify-center items-center' />
        </div>
        <div className='mt-2'>
          <Link to='/login'><button className='border border-black w-[20rem] rounded-[15rem] py-1 font-medium hover:bg-slate-100 duration-200'>Login to Your Luxora account</button></Link>
        </div>
      </div>
    </>
  )
}

export default Add_Product