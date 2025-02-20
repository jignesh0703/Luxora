import axios from 'axios';
import React, { useContext, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/Context';

const Email_OTP = ({ setOTP, email }) => {

  const { apiURL } = useContext(StoreContext)
  const [OTPs, setOTPs] = useState('')

  const SubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${apiURL}/api/user/updateemail`, { email, otp: OTPs }, {
        withCredentials: true,
        headers: {
          "Content-Type": 'application/json'
        }
      })
      setOTP(false)
      toast.success(response.data.message)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <>
      <div onClick={() => setOTP(false)}>
        <div className='absolute mt-[9.5rem] ml-[30.5rem] cursor-pointer z-[9999] text-white' onClick={(e) => e.stopPropagation()}>
          <IoMdClose className='text-[2.5rem]' />
        </div>
        <div className='w-full h-full fixed left-0 top-0 black_overlay flex justify-center z-50'>
          <form className='bg-white mt-[15rem] w-[30rem] h-[17rem]'
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => SubmitHandler(e)}
          >
            <div className='w-full flex justify-between px-[2rem] mt-[2rem] items-end'>
              <h1 className='font-semibold text-[1.3rem]'>Verify OTP</h1>
              <h1 className='font-semibold text-blue-600 cursor-pointer'>Resend OTP</h1>
            </div>
            <div className='px-[2rem] mt-4'>
              <div className='flex flex-col'>
                <label htmlFor="OTP">Enter OTP</label>
                <input
                  type="text"
                  value={OTPs}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || (/^\d+$/.test(value) && value.length <= 6)) {
                      setOTPs(value);
                    }
                  }}
                  className="border border-black outline-none h-[2.5rem] pl-[1rem] mt-2"
                />
              </div>
              <button className='h-[2.5rem] bg-[#2874f0] text-[1.3rem] font-bold text-white w-full mt-6'>SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Email_OTP