import axios from 'axios'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/Context'
import { toast } from 'react-toastify'
import { Oval } from "react-loader-spinner";

const Add_Addresh = ({ setsawAdd_Addresh, settrakcaddresh, trakcaddresh }) => {

    const [isLoading, setisLoading] = useState(false)
    const { apiURL } = useContext(StoreContext)
    const [focusedFields, setfocusedFields] = useState({})
    const HandleFocus = (feild) => {
        setfocusedFields((prev) => ({
            ...prev,
            [feild]: true
        }))
    }
    const HandleBlur = (feild, e) => {
        if (!e.target.value) {
            setfocusedFields((prev) => ({
                ...prev,
                [feild]: false
            }))
        }
    }

    const indianStates = [
        "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
        "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
        "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
        "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
        "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
        "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const [formdata, setformdata] = useState({
        name: '',
        number: '',
        pincode: '',
        address: '',
        city: '',
        state: '',
        address_type: ''
    })

    const ChangeHandler = (e) => {
        setformdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const SubmitHandler = async (e) => {
        setisLoading(true)
        e.preventDefault()
        try {
            const response = await axios.post(`${apiURL}/api/address/add`, formdata, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            toast.success(response.data.message)
            setsawAdd_Addresh(false)
            settrakcaddresh(!trakcaddresh)
            setformdata({
                name: '',
                number: '',
                pincode: '',
                address: '',
                city: '',
                state: '',
                address_type: ''
            })
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
        setisLoading(false)
    }

    const FindLocationviaPincode = async (e) => {
        if (e.target.value.length <= 6) {
            ChangeHandler(e);
            if (e.target.value.length === 6) {
                const url = `https://nominatim.openstreetmap.org/search?postalcode=${e.target.value}&countrycodes=IN&format=json`;
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.length > 0) {
                        const location = data[0].display_name;
                        const parts = location.split(', ').slice(1);
                        const len = parts.length;
                        const city = len >= 3 ? parts[len - 3] : 'Unknown';
                        const state = len >= 3 ? parts[len - 2] : 'Unknown';
                        setformdata((prev) => ({
                            ...prev,
                            city,
                            state
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching location:", error);
                }
            }
        }
    };

    return (
        <>
            {
                isLoading && <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-50 z-50">
                    <Oval type="Oval" color="#00BFFF" height={50} width={50} />
                </div>
            }
            <div className='border border-slate-300 mt-8 p-6  text-[#2874f0] font-bold bg-[#f5faff]'>
                <div>
                    Add A NEW ADDRESS
                </div>
                <form className='mt-4' onSubmit={SubmitHandler}>
                    <div className='flex gap-4'>
                        <div>
                            {
                                focusedFields.name && <label htmlFor="name" className='absolute text-black ml-4 text-[.8rem] font-bold'>Name</label>
                            }
                            <input
                                type="text"
                                name='name'
                                value={formdata.name}
                                onChange={ChangeHandler}
                                className={`w-[15rem] h-[3rem] border border-slate-300 outline-none pl-4 font-normal text-black ${focusedFields.name ? 'pt-4' : ''}`} placeholder='Name'
                                onFocus={() => HandleFocus('name')}
                                onBlur={(e) => HandleBlur('name', e)}
                            />
                        </div>
                        <div>
                            {
                                focusedFields.number && <label htmlFor="number" className='absolute text-black ml-4 text-[.8rem] font-bold'>10 Digit mobile number</label>
                            }
                            <input
                                type="number"
                                name='number'
                                value={formdata.number}
                                onChange={(e) => {
                                    if (e.target.value.length <= 10) {
                                        ChangeHandler(e)
                                    }
                                }}
                                className={`w-[15rem] h-[3rem] border border-slate-300 outline-none pl-4 font-normal text-black ${focusedFields.number ? 'pt-4' : ''}`} placeholder='10 Digit mobile number'
                                onFocus={() => HandleFocus('number')}
                                onBlur={(e) => HandleBlur('number', e)}
                            />
                        </div>
                    </div>
                    <div className='flex mt-4'>
                        {
                            focusedFields.pincode && <label htmlFor="pincode" className='absolute text-black ml-4 text-[.8rem] font-bold'>Pincode</label>
                        }
                        <input
                            type="number"
                            name='pincode'
                            value={formdata.pincode}
                            onChange={FindLocationviaPincode}
                            className={`w-[15rem] h-[3rem] border border-slate-300 outline-none pl-4 font-normal text-black ${focusedFields.pincode ? 'pt-4' : ''}`} placeholder='Pincode'
                            onFocus={() => HandleFocus('pincode')}
                            onBlur={(e) => HandleBlur('pincode', e)}
                        />
                    </div>
                    <div className='my-4'>
                        {
                            focusedFields.address && <label htmlFor="address" className='absolute text-black ml-4 mt-2 text-[.8rem] font-bold'>Address (Area and Street)</label>
                        }
                        <textarea
                            type="text"
                            name='address'
                            value={formdata.address}
                            onChange={ChangeHandler}
                            className={`w-[31rem] h-[6rem] resize-none border border-slate-300 outline-none pl-4 font-normal items-start text-black ${focusedFields.address ? 'pt-6' : ''}`} placeholder='Address (Area and Street)'
                            onFocus={() => HandleFocus('address')}
                            onBlur={(e) => HandleBlur('address', e)}
                        />
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            {
                                focusedFields.city || formdata.city && <label htmlFor="city" className='absolute text-black ml-4 text-[.8rem] font-bold'>City/District/Town</label>
                            }
                            <input
                                type="text"
                                name='city'
                                value={formdata.city}
                                onChange={ChangeHandler}
                                className={`w-[15rem] h-[3rem] border border-slate-300 outline-none pl-4 font-normal text-black ${focusedFields.city || formdata.city ? 'pt-4' : ''}`}
                                placeholder='City/District/Town'
                                onFocus={() => HandleFocus('city')}
                                onBlur={(e) => HandleBlur('city', e)}
                            />
                        </div>
                        <div>
                            {
                                formdata.state && <label htmlFor="state" className='absolute text-slate-400 ml-4 text-[.8rem] font-bold'>State</label>
                            }
                            <select
                                name="state"
                                value={formdata.state || ''}
                                onChange={ChangeHandler}
                                className={`w-[15rem] h-[3rem] border border-slate-300 outline-none pl-4 font-normal text-black ${formdata.state ? 'pt-4' : ''}`}
                            >
                                <option value="">Select State</option>
                                {
                                    indianStates.map((item, index) => {
                                        return <option value={item} key={index}>{item}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="name" className='text-slate-400 ml-4 text-[.8rem] font-bold'>Address Type</label>
                        <div className='flex gap-8 mt-2 ml-4'>
                            <label htmlFor='home' className='flex gap-2 items-center'>
                                <input
                                    type="radio"
                                    name="address_type"
                                    value='home'
                                    onChange={ChangeHandler}
                                    checked={formdata.address_type === 'home'}
                                    className={`w-[1.1rem] h-[1.1rem] cursor-pointer rounded-full border border-gray-400 checked:bg-[#131921]`}
                                />
                                <h1>Home</h1>
                            </label>
                            <label htmlFor='work' className='flex gap-2 items-center'>
                                <input
                                    type="radio"
                                    name="address_type"
                                    value='work'
                                    onChange={ChangeHandler}
                                    checked={formdata.address_type === 'work'}
                                    className={`w-[1.1rem] h-[1.1rem] cursor-pointer rounded-full border border-gray-400 checked:bg-[#131921]`}
                                />
                                <h1>Work</h1>
                            </label>
                        </div>
                    </div>
                    <div className='mt-8 flex gap-4'>
                        <button className='w-[12rem] h-[3rem] bg-[#2874f0] text-white' type='submit'>SAVE</button>
                        <button className='w-[12rem] h-[3rem] bg-slate-100' onClick={() => setsawAdd_Addresh(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Add_Addresh