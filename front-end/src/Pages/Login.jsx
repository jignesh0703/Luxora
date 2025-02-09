import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const [sawOTPinput, setsawOTPinput] = useState(false)
  const [formdata, setformdata] = useState({
    EmailOrUsername: '',
    password: '',
    OTP: ''
  })

  const ChangeHandler = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    })
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    if (!sawOTPinput) {
      return setsawOTPinput(true)
    }
  }

  return (
    <>
      <div className='w-full h-full flex justify-center items-center mt-[3rem] flex-col'>
        <div className='p-4 border border-slate-300 rounded-[10px] flex justify-center'>
          <form className='w-[19rem]' onSubmit={SubmitHandler}>
            <h1 className='text-[2rem] font-bold'>Sign In</h1>
            <div>
              <div className='flex flex-col'>
                <label htmlFor="email" className='font-bold'>Enter Email or Username</label>
                <input
                  type="text"
                  name='EmailOrUsername'
                  className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                  onChange={ChangeHandler}
                  value={formdata.EmailOrUsername}
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className='font-bold'>Enter Password</label>
                <input
                  type="text"
                  name='password'
                  className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                  onChange={ChangeHandler}
                  value={formdata.password}
                  required
                />
              </div>
              <div className='mt-2'>
                <button className='w-[18rem] py-1 rounded-[5px] bg-yellow-500 font-bold'>Continue</button>
              </div>
              <div>
                <h1 className='text-[0.8rem]'>By continuing, you agree to Luxora's <a className='text-[#006aaf] border-b border-[#006aaf] cursor-pointer'>Conditions of Use</a> and <a className='text-[#006aaf] border-b border-[#006aaf] cursor-pointer'>Privacy Notice.</a></h1>
              </div>
              <div className='flex justify-end mr-4'>
                <h1 className='text-[#006aaf] font-medium cursor-pointer'>Forgot Password</h1>
              </div>
            </div>
          </form>
        </div>
        <div className='flex justify-center items-center gap-2 mt-2'>
          <hr className='bg-slate-400 w-[6rem] h-[2px] rounded-full flex justify-center items-center' />
          <h1>New to Luxora?</h1>
          <hr className='bg-slate-400 w-[6rem] h-[2px] rounded-full flex justify-center items-center' />
        </div>
        <div className='mt-2'>
          <Link to='/signup'><button className='border border-black w-[20rem] rounded-[15rem] py-1 font-medium hover:bg-slate-100 duration-200'>Create Your Luxora account</button></Link>
        </div>
      </div>
    </>
  )
}

export default Login