import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../context/Context'
import { toast } from 'react-toastify'
import { Oval } from "react-loader-spinner";

const Become_Seller = () => {

    const Navigate = useNavigate()
    const { apiURL } = useContext(StoreContext)
    const [isLoading, setisLoading] = useState(false)
    const [formdata, setformdata] = useState({
        fullname: '',
        number: '',
        email: '',
        bank_number: '',
        gst_number: '',
        password: ''
    })

    const ChangeHadler = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault()
        setisLoading(true)
        try {
            const responce = await axios.post(`${apiURL}/api/seller/registor`, formdata, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            toast.success(responce.data.message)
            Navigate('/')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
        setisLoading(false)
    }

    return (
        <>
            {
                isLoading
                && <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-50 z-50">
                    <Oval type="Oval" color="#00BFFF" height={50} width={50} />
                </div>
            }
            <div className='flex flex-col items-center mt-12'>
                <div className='w-[22.5rem] border border-slate-300 p-8 rounded-[15px]'>
                    <div className='font-bold text-[1.5rem]'>
                        <h1>Become Seller on Luxora</h1>
                    </div>
                    <div className='mt-4'>
                        <form onSubmit={SubmitHandler}>
                            <div>
                                <div className='flex flex-col'>
                                    <label htmlFor="fullname" className='font-bold'>FullName</label>
                                    <input
                                        type="text"
                                        name='fullname'
                                        value={formdata.fullname}
                                        onChange={ChangeHadler}
                                        className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label htmlFor="monumber" className='font-bold'>Mobile Number</label>
                                    <input
                                        type="number"
                                        name='number'
                                        value={formdata.number}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 10) {
                                                ChangeHadler(e)
                                            }
                                        }}
                                        className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label htmlFor="email" className='font-bold'>Email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        value={formdata.email}
                                        onChange={ChangeHadler}
                                        className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label htmlFor="bank_number" className='font-bold'>Bank Account Number</label>
                                    <input
                                        type="number"
                                        name='bank_number'
                                        value={formdata.bank_number}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 16) { //11
                                                ChangeHadler(e)
                                            }
                                        }}
                                        className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label htmlFor="gst_number" className='font-bold'>GST Number</label>
                                    <input
                                        type="text"
                                        name='gst_number'
                                        value={formdata.gst_number}
                                        onChange={(e) => {
                                            const Uppercase = e.target.value.toUpperCase()
                                            if (Uppercase.length <= 15) {
                                                ChangeHadler({ target: { name: e.target.name, value: Uppercase } })
                                            }
                                        }}
                                        className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label htmlFor="password" className='font-bold'>Password</label>
                                    <input
                                        type="password"
                                        name='password'
                                        value={formdata.password}
                                        onChange={ChangeHadler}
                                        className='outline-none border border-black rounded-[5px] py-1 w-[18rem] pl-4'
                                        required
                                    />
                                </div>
                                <div className='text-[.8rem] mt-2'>
                                    <h1>By continuing, I agree to Flipkart’s <a className='text-[#006aaf] font-bold cursor-pointer'>Terms of Use</a> & <a className='text-[#006aaf] font-bold cursor-pointer'>Privacy Policy</a></h1>
                                </div>
                                <div className='mt-4'>
                                    <button className='w-[18rem] py-1 rounded-[5px] bg-yellow-500 font-bold'>Continue</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Become_Seller