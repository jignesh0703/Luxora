import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Add_Addresh from './Add_Addresh';
import One_Address from './One_Address';
import axios from 'axios';
import { StoreContext } from '../../context/Context';

const All_Addresh = () => {

    const { apiURL } = useContext(StoreContext)
    const [sawAdd_Addresh, setsawAdd_Addresh] = useState(false)
    const [Addressdata, setAddressdata] = useState(null)

    const FetchAddress = async () => {
        try {
            const response = await axios.get(`${apiURL}/api/address/fetch`, {
                withCredentials: true
            })
            console.log(response.data.FindUser.address)
            setAddressdata(response.data.FindUser.address)
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        FetchAddress()
    }, [])


    return (
        <>
            <div className='border border-slate-300 mt-8 p-6 flex gap-4 items-center text-[#2874f0] font-bold cursor-pointer' onClick={() => setsawAdd_Addresh(true)}>
                <FaPlus /> Add A NEW ADDRESS
            </div>
            {
                sawAdd_Addresh && <Add_Addresh setsawAdd_Addresh={setsawAdd_Addresh} />
            }
            {
                Addressdata && Addressdata.map((item, index) => {
                    return <One_Address id={item._id} name={item.name} number={item.number} pincode={item.pincode} city={item.city} state={item.state} address={item.address} address_type={item.address_type} key={index} />
                })
            }
        </>
    )
}

export default All_Addresh