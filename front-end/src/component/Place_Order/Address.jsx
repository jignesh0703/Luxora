import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineLocalShipping } from "react-icons/md";
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/Context';
import Select_Address from './Select_Address';
import { FaPlus } from "react-icons/fa6";
import Add_Addresh from '../../component/ProfilePage/Add_Addresh'

const Address = () => {

    const { apiURL } = useContext(StoreContext)
    const [trakcaddresh, settrakcaddresh] = useState(false)
    const [Address_Data, setAddress_Data] = useState(null)
    const [MainAddress, setMainAddress] = useState(null)
    const [sawFirst_Part, setsawFirst_Part] = useState(false)
    const [Add_Address, setAdd_Address] = useState(false)

    useEffect(() => {
        const FetchAddress = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/address/fetch`, {
                    withCredentials: true
                })
                setAddress_Data(response.data.FindUser.address)
                if (response.data.FindUser.address.length > 0) {
                    setMainAddress(response.data.FindUser.address[response.data.FindUser.address.length - 1])
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                }
            }
        }
        FetchAddress()
    }, [trakcaddresh])

    return (
        <div className='bg-white w-max h-max shadow-md mt-[2rem]'>
            <div className='flex justify-between items-center w-[50rem]'>
                <div className={`flex flex-col gap-2 p-4 px-8 ${sawFirst_Part && 'bg-[#2874f0] w-[50rem]'}`}>
                    <div className={`flex gap-2 ${sawFirst_Part && ' text-white w-full'}`}>
                        <MdOutlineLocalShipping className='text-[1.5rem]' />
                        <h1 className={`font-bold text-gray-400 ${sawFirst_Part && 'text-white'}`}>DELIVERY ADDRESS</h1>
                    </div>
                    {
                        !sawFirst_Part && <div className='flex gap-2'>
                            <h1 className='font-semibold'>{MainAddress?.name}</h1>
                            <h1>{MainAddress?.address},</h1>
                            <h1>{MainAddress?.city},</h1>
                            <h1>{MainAddress?.state}</h1>
                            <h1>-</h1>
                            <h1 className='font-semibold'>{MainAddress?.pincode}</h1>
                        </div>
                    }
                </div>
                {
                    !sawFirst_Part
                    && <div className='p-4 px-8'>
                        <button
                            className='border border-gray-300 p-2 px-4 font-semibold text-[#2874f0] '
                            onClick={() => setsawFirst_Part(true)}
                        >
                            CHANGE
                        </button>
                    </div>
                }
            </div>
            {
                sawFirst_Part && <div className='bg-white'>
                    <Select_Address Address_Data={Address_Data} MainAddress={MainAddress} setMainAddress={setMainAddress} setsawFirst_Part={setsawFirst_Part} />
                </div>
            }
            {
                (sawFirst_Part || Add_Address) && <div className='mt-4 pb-4 px-8 flex gap-4 text-[#2874f0] items-center font-semibold cursor-pointer' onClick={() => setAdd_Address(true)}>
                    <FaPlus />
                    <h1>Add a new address</h1>
                </div>
            }
            {
                Add_Address && <div className='px-8'>
                    <Add_Addresh setsawAdd_Addresh={setAdd_Address} trakcaddresh={trakcaddresh} settrakcaddresh={settrakcaddresh} />
                </div>
            }
        </div>
    )
}

export default Address