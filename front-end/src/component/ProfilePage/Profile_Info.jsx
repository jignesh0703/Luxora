import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/Context'
import { toast } from 'react-toastify'
import axios from 'axios'
import Email_OTP from './Email_OTP'

const Profile_Info = () => {

  const { apiURL, trackuserdata, settrackuserdata } = useContext(StoreContext)
  const [NewEmail, setNewEmail] = useState(null)
  const [OTP, setOTP] = useState(false)
  const { userdata } = useContext(StoreContext)
  const [infodisable, setinfodisable] = useState(true)
  const [addreshDisable, setaddreshDisable] = useState(true)
  const [mobileDisable, setmobileDisable] = useState(true)
  const [formdata, setformdata] = useState({
    username: '',
    gender: '',
    email: '',
    number: ''
  })

  useEffect(() => {
    if (userdata?.user?.username) {
      setformdata((prev) => ({
        ...prev,
        username: userdata.user.username || '',
        gender: userdata.user.gender || '',
        email: userdata.user.email || '',
        number: userdata.user.number || ''
      }))
    }
  }, [userdata])

  const ChangeHandler = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const CancelHandler = () => {
    setinfodisable(true)
    setformdata({
      username: userdata?.user.username,
      gender: userdata?.user.gender || '',
      email: userdata?.user.email || '',
      number: userdata?.user.number || ''
    })
  }

  const hasUserChanged = () => {
    return (
      formdata.username !== (userdata?.user?.username || '') ||
      formdata.gender !== (userdata?.user?.gender || '') ||
      formdata.email !== (userdata?.user?.email || '') ||
      formdata.number !== (userdata?.user?.number || '')
    );
  };

  const SubmitHandlerUserName = async (e) => {
    e.preventDefault()

    if (!hasUserChanged()) {
      return toast.error("Don't make any changes");
    }

    try {
      const response = await axios.post(`${apiURL}/api/user/updateusername`, formdata, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      settrackuserdata(!trackuserdata)
      toast.success(response.data.message)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
    setinfodisable(true)
  }

  const SubmitHandlerNumber = async (e) => {
    e.preventDefault()
    if (!hasUserChanged()) {
      return toast.error("Don't make any changes");
    }

    try {
      const response = await axios.post(`${apiURL}/api/user/updatenumber`, formdata, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      settrackuserdata(!trackuserdata)
      toast.success(response.data.message)
      setmobileDisable(true)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  const SubmitHandlerEmail = async (e) => {
    e.preventDefault()
    if (!hasUserChanged()) {
      return toast.error("Don't make any changes");
    }

    try {
      const response = await axios.post(`${apiURL}/api/otp/send-otp`, formdata, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setNewEmail(formdata.email)
      toast.success(response.data.message)
      setOTP(true)
      setaddreshDisable(true)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <>
      {
        OTP && <Email_OTP setOTP={setOTP} email={NewEmail}/>
      }
      <div className='p-6'>
        <div className='flex flex-col'>
          <div className='flex gap-4 items-end'>
            <h1 className='flex font-bold text-[1.2rem]'>Personal Information</h1>
            {
              infodisable
                ? <h4 className='cursor-pointer text-blue-400 font-medium' onClick={() => setinfodisable(false)}>Edit</h4>
                : <h4 className='cursor-pointer text-blue-400 font-medium' onClick={CancelHandler}>Cancel</h4>
            }
          </div>
          <form className='mt-4' onSubmit={SubmitHandlerUserName}>
            {
              infodisable
                ? <></>
                : <h1 className='absolute ml-8 text-[.8rem] font-bold mt-2'>Username</h1>
            }
            <div className='flex gap-4'>
              <input
                type="text"
                name='username'
                placeholder={userdata?.user?.username}
                className={`border border-gray-300 pl-8 h-[3.5rem] w-[15rem]  outline-none focus:border-[#131921] ${infodisable ? 'text-slate-500 flex items-center cursor-not-allowed' : 'pt-6'} `}
                value={formdata.username}
                onChange={ChangeHandler}
                disabled={infodisable}
              />
              {
                infodisable
                  ? <></>
                  : <button className='bg-[#2874f0] w-[10rem] text-white font-bold text-[1.2rem] h-[3.5rem] flex justify-center items-center'>
                    Save
                  </button>
              }
            </div>
            <div className='mt-4'>
              <h1>Your Gender</h1>
              <div className='flex gap-8 mt-2'>
                <label htmlFor="male" className='flex items-center gap-3'>
                  <input
                    type="radio"
                    name="gender"
                    value='male'
                    checked={formdata.gender === 'male'}
                    onChange={ChangeHandler}
                    className={`w-[1.1rem] h-[1.1rem] cursor-pointer rounded-full border border-gray-400 checked:bg-[#131921] ${infodisable ? 'cursor-not-allowed' : ''}`}
                    disabled={infodisable}
                  />
                  <h1 className={`${infodisable ? 'text-slate-500' : ''}`}>Male</h1>
                </label>
                <label htmlFor="female" className='flex items-center gap-3'>
                  <input
                    type="radio"
                    name="gender"
                    value='female'
                    checked={formdata.gender === 'female'}
                    onChange={ChangeHandler}
                    className={`w-[1.1rem] h-[1.1rem] cursor-pointer rounded-full border border-gray-400 checked:bg-[#131921] ${infodisable ? 'cursor-not-allowed' : ''}`}
                    disabled={infodisable}
                  />
                  <h1 className={`${infodisable ? 'text-slate-500' : ''}`}>Female</h1>
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className='flex flex-col mt-12'>
          <div className='flex gap-4 items-end'>
            <h1 className='flex font-bold text-[1.2rem]'>Email Address</h1>
            {
              addreshDisable
                ? <h4 className='cursor-pointer text-blue-400 font-medium' onClick={() => setaddreshDisable(false)}>Edit</h4>
                : <h4 className='cursor-pointer text-blue-400 font-medium' onClick={() => setaddreshDisable(true)}>Cancel</h4>
            }
          </div>
          <form className='mt-4' onSubmit={SubmitHandlerEmail}>
            {
              addreshDisable
                ? <></>
                : <h1 className='absolute ml-8 text-[.8rem] font-bold mt-2'>Email</h1>
            }
            <div className='flex gap-4'>
              <input
                type="text"
                name='email'
                placeholder={userdata?.user.email}
                className={`border border-gray-300 pl-8 h-[3.5rem] w-[15rem]  outline-none focus:border-[#131921] ${addreshDisable ? 'text-slate-500 flex items-center cursor-not-allowed' : 'pt-6'} `}
                value={formdata.email}
                onChange={ChangeHandler}
                disabled={addreshDisable}
              />
              {
                addreshDisable
                  ? <></>
                  : <button className='bg-[#2874f0] w-[10rem] text-white font-bold text-[1.2rem] h-[3.5rem] flex justify-center items-center'>
                    Save
                  </button>
              }
            </div>
          </form>
        </div>
        <div className='flex flex-col mt-12'>
          <div className='flex gap-4 items-end'>
            <h1 className='flex font-bold text-[1.2rem]'>Mobile Number</h1>
            {
              mobileDisable
                ? <h4 className='cursor-pointer text-blue-400 font-medium' onClick={() => setmobileDisable(false)}>Edit</h4>
                : <h4 className='cursor-pointer text-blue-400 font-medium' onClick={() => setmobileDisable(true)}>Cancel</h4>
            }
          </div>
          <form className='mt-4' onSubmit={SubmitHandlerNumber}>
            {
              mobileDisable
                ? <></>
                : <h1 className='absolute ml-8 text-[.8rem] font-bold mt-2'>Mobile Number</h1>
            }
            <div className='flex gap-4'>
              <input
                type="number"
                name='number'
                placeholder={userdata?.user.number || '0000000000'}
                className={`border border-gray-300 pl-8 h-[3.5rem] w-[15rem]  outline-none focus:border-[#131921] ${mobileDisable ? 'text-slate-500 flex items-center cursor-not-allowed' : 'pt-6'} `}
                value={formdata.number}
                onChange={ChangeHandler}
                maxLength={10}
                disabled={mobileDisable}
              />
              {
                mobileDisable
                  ? <></>
                  : <button className='bg-[#2874f0] w-[10rem] text-white font-bold text-[1.2rem] h-[3.5rem] flex justify-center items-center'>
                    Save
                  </button>
              }
            </div>
          </form>
        </div>
        <div className='mt-12'>
          <h1 className='flex font-bold text-[1.2rem]'>FAQs</h1>
          <div>
            <div className='mt-4'>
              <h1 className='font-semibold'>What happens when I update my email address (or mobile number)?</h1>
              <h4 className='mt-4'>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</h4>
            </div>
            <div className='mt-4'>
              <h1 className='font-semibold'>When will my Luxora account be updated with the new email address (or mobile number)?</h1>
              <h4 className='mt-4'>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</h4>
            </div>
            <div className='mt-4'>
              <h1 className='font-semibold'>What happens to my existing Luxora account when I update my email address (or mobile number)?</h1>
              <h4 className='mt-4'>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</h4>
            </div>
            <div className='mt-4'>
              <h1 className='font-semibold'>Does my Seller account get affected when I update my email address?</h1>
              <h4 className='mt-4'>Luxora has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</h4>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <h1 className='font-bold text-[#d23276] cursor-pointer'>Delete Account</h1>
        </div>
      </div>
    </>
  )
}

export default Profile_Info