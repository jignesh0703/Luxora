import React, { useEffect, useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Add_Addresh from './Add_Addresh';
import One_Address from './One_Address';

const All_Addresh = () => {

    const [sawAdd_Addresh, setsawAdd_Addresh] = useState(false)

    return (
        <>
            <div className='border border-slate-300 mt-8 p-6 flex gap-4 items-center text-[#2874f0] font-bold cursor-pointer' onClick={() => setsawAdd_Addresh(true)}>
                <FaPlus /> Add A NEW ADDRESS
            </div>
            {
                sawAdd_Addresh && <Add_Addresh setsawAdd_Addresh={setsawAdd_Addresh} />
            }
            <div className=''>
                <One_Address />
            </div>
        </>
    )
}

export default All_Addresh