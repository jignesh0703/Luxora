import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { StoreContext } from '../../context/Context';
import { toast } from 'react-toastify';

const One_Address = ({ id, name, number, address, pincode, city, state, address_type, trakcaddresh, settrakcaddresh }) => {

    const { apiURL } = useContext(StoreContext)
    const [showMenu, setshowMenu] = useState(false)
    const dropref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropref.current && !dropref.current.contains(e.target)) {
                setshowMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const RemoveAddresh = async () => {
        try {
            const response = await axios.delete(`${apiURL}/api/address/remove/${id}`, {
                withCredentials: true
            })
            settrakcaddresh(!trakcaddresh)
            setshowMenu(false)
            toast.success(response.data.message)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div className='border border-slate-300 mt-8 p-6 flex justify-between'>
            <div className=''>
                <div>
                    <h1 className='bg-slate-300 w-max px-2 rounded-[5px] font-medium text-gray-500'>{(address_type).toUpperCase()}</h1>
                </div>
                <div className='flex gap-6 mt-2 font-semibold'>
                    <h1>{name}</h1>
                    <h1>{number}</h1>
                </div>
                <div className='flex mt-2 gap-1'>
                    <h1>{address},</h1>
                    <h1>{city},</h1>
                    <h1>{state}</h1>
                    <h1 className='font-semibold'>-{pincode}</h1>
                </div>
            </div>
            <div className='relative'>
                <div className='text-[1.3rem] cursor-pointer text-slate-700'>
                    <HiOutlineDotsVertical onClick={() => setshowMenu(true)} />
                </div>
                {
                    showMenu
                    && <div className="absolute right-0 -mt-1 mr-4 w-28 bg-white border rounded-lg shadow-lg" ref={dropref}>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            ✏️ Edit
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => RemoveAddresh()}>
                            🗑️ Delete
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default One_Address