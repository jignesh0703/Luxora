import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/Context'

const Profile = () => {

  const { userdata } = useContext(StoreContext)
  const [infodisable, setinfodisable] = useState(true)
  const [addreshDisable, setaddreshDisable] = useState(true)
  const [mobileDisable, setmobileDisable] = useState(true)
  const [formdata, setformdata] = useState({
    fullname: '',
    email: '',
    number: ''
  })

  useEffect(() => {
    if (userdata?.Seller) {
      setformdata((prev) => ({
        ...prev,
        fullname: userdata.Seller.fullname || '',
        email: userdata.Seller.email || '',
        number: userdata.Seller.number || ''
      }))
    }
  }, [userdata])

  const ChangeHandler = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    console.log('formdata : ', formdata)
    setinfodisable(true)
    setaddreshDisable(true)
    setmobileDisable(true)
  }

  const CancelHandler = () => {
    setinfodisable(true)
    setformdata({
      fullname: userdata?.Seller.fullname || '',
      email: userdata?.Seller.email || '',
      number: userdata?.Seller.number || ''
    })
  }

  return (
    <>
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
          <form className='mt-4' onSubmit={SubmitHandler}>
            {
              infodisable
                ? <></>
                : <h1 className='absolute ml-8 text-[.8rem] font-bold mt-2'>Full Name</h1>
            }
            <div className='flex gap-4'>
              <input
                type="text"
                name='fullname'
                placeholder={userdata?.Seller?.fullname}
                className={`border border-gray-300 pl-8 h-[3.5rem] w-[15rem]  outline-none focus:border-[#131921] ${infodisable ? 'text-slate-500 flex items-center cursor-not-allowed' : 'pt-6'} `}
                value={formdata.fullname || ''}
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
          <form className='mt-4' onSubmit={SubmitHandler}>
            {
              addreshDisable
                ? <></>
                : <h1 className='absolute ml-8 text-[.8rem] font-bold mt-2'>Email</h1>
            }
            <div className='flex gap-4'>
              <input
                type="text"
                name='email'
                placeholder={userdata?.Seller.email}
                className={`border border-gray-300 pl-8 h-[3.5rem] w-[15rem]  outline-none focus:border-[#131921] ${addreshDisable ? 'text-slate-500 flex items-center cursor-not-allowed' : 'pt-6'} `}
                value={formdata.email || ''}
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
          <form className='mt-4' onSubmit={SubmitHandler}>
            {
              mobileDisable
                ? <></>
                : <h1 className='absolute ml-8 text-[.8rem] font-bold mt-2'>Mobile Number</h1>
            }
            <div className='flex gap-4'>
              <input
                type="number"
                name='number'
                placeholder={userdata?.Seller.number || '0000000000'}
                className={`border border-gray-300 pl-8 h-[3.5rem] w-[15rem]  outline-none focus:border-[#131921] ${mobileDisable ? 'text-slate-500 flex items-center cursor-not-allowed' : 'pt-6'} `}
                value={formdata.number || ''}
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
      </div>
    </>
  )
}

export default Profile