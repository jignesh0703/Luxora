import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../context/Context'
import { toast } from 'react-toastify'
import { Oval } from "react-loader-spinner";

const Signup = () => {

  const { apiURL } = useContext(StoreContext)
  const [sawOTPinput, setsawOTPinput] = useState(false)
  const [time, settime] = useState(30)
  const [sawtime, setsawtime] = useState(false)
  const [formdata, setformdata] = useState({
    email: '',
    username: '',
    password: '',
    otp: ''
  })
  const [isLoading, setisLoading] = useState(false)
  const Navigate = useNavigate()

  const ChangeHandler = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const SubmitHandler = async (e) => {
    e.preventDefault()
    if (!sawOTPinput) {
      setsawtime(true)
      setsawOTPinput(true)
      HandleOtpClick()
      return
    }
    setisLoading(true)

    const formdatas = new FormData()
    formdatas.append('email', formdata.email)
    formdatas.append('username', formdata.username)
    formdatas.append('password', formdata.password)
    formdatas.append('otp', formdata.otp)

    for (let [key, value] of formdatas.entries()) {
    }

    try {
      const response = await axios.post(`${apiURL}/api/user/registration`, formdatas, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      toast.success(response.data.message)
      Navigate('/login')
    } catch (error) {
      setisLoading(false)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
    setisLoading(false)
  }

  useEffect(() => {
    if (!sawtime || time <= 0) {
      setsawtime(false)
      return
    }
    const Timer = setInterval(() => {
      settime((prevtime) => prevtime - 1)
    }, 1000)
    return () => clearInterval(Timer)
  }, [time, sawtime])

  const HandleOtpClick = async () => {
    if (!formdata.email || !formdata.username || !formdata.password) {
      toast.error("Please fill in all fields before requesting OTP.");
      return;
    }
    setsawOTPinput(true)
    setsawtime(true)
    settime(30)

    try {
      await axios.post(`${apiURL}/api/otp/send-otp`, formdata, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <>
      {
        isLoading
        && <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-50 z-50">
          <Oval type="Oval" color="#00BFFF" height={50} width={50} />
        </div>
      }
      <div className='w-full h-full flex justify-center items-center mt-[3rem] flex-col'>
        <div className='p-4 border border-slate-300 rounded-[10px] flex justify-center'>
          <form className='w-[19rem]' onSubmit={SubmitHandler}>
            <h1 className='text-[2rem] font-bold'>Sign Up</h1>
            <div>
              <div className='flex flex-col'>
                <label htmlFor="email" className='font-bold'>Enter Email</label>
                <input
                  type="email"
                  name='email'
                  value={formdata.email}
                  onChange={ChangeHandler}
                  className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="email" className='font-bold'>Enter Username</label>
                <input
                  type="text"
                  name='username'
                  value={formdata.username}
                  onChange={(e) => {
                    if (e.target.value.length <= 15) {
                      ChangeHandler(e)
                    }
                  }}
                  className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className='font-bold'>Enter Password</label>
                <input
                  type="password"
                  name='password'
                  value={formdata.password}
                  onChange={ChangeHandler}
                  className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                  required
                />
              </div>
              {
                sawOTPinput
                && <div className='flex flex-col'>
                  <label htmlFor="email" className='font-bold'>Enter OTP</label>
                  <input
                    type="number"
                    name='otp'
                    value={formdata.otp}
                    onChange={(e) => {
                      if (e.target.value.length <= 6) {
                        ChangeHandler(e)
                      }
                    }}
                    className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                    required
                  />
                </div>
              }
              <div className='flex justify-end mr-4'>
                {
                  sawtime
                    ? <h1 className='text-[#006aaf] font-medium cursor-pointer'>CountDown {time} s</h1>
                    : <h1 className='text-[#006aaf] font-medium cursor-pointer' onClick={HandleOtpClick}>{sawOTPinput ? 'Resend OTP' : 'Send OTP'}</h1>
                }
              </div>
              <div className='mt-2 font-semibold text-[.8rem]'>
                <p>To verify your email, we will send you a text message with a temporary code.</p>
              </div>
              <div className='mt-1'>
                <button className='w-[18rem] py-1 rounded-[5px] bg-yellow-500 font-bold'>{sawOTPinput ? 'Continue' : 'Verify Email'}</button>
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

export default Signup