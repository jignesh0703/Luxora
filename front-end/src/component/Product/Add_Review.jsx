import axios from 'axios';
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/Context'
import { IoMdSend } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Add_Review = ({ setSawAddReview, settrackreview, trackreview }) => {

    const { id } = useParams()
    const { apiURL } = useContext(StoreContext)
    const [Review, setReview] = useState('')
    const Submithandler = async (e) => {
        e.preventDefault()

        if (!Review.trim()) {
            toast.error("Review cannot be empty!");
            return;
        }

        try {
            const response = await axios.post(`${apiURL}/api/rate/add/${id}`, { review: Review }, {
                withCredentials: true
            })
            toast.success(response.data.message)
            setReview('')
            setSawAddReview(false)
            settrackreview(!trackreview)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <>
            <div className='w-[45rem] mt-4'>
                <form className='flex gap-4' onSubmit={Submithandler}>
                    <textarea
                        placeholder="Add Review here"
                        value={Review}
                        onChange={(e) => setReview(e.target.value)}
                        onInput={(e) => {
                            e.target.style.height = "3rem";
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
                        }}
                        className="border outline-none w-[41rem] p-2 font-semibold resize-none min-h-[3rem] max-h-[14rem] overflow-y-auto rounded-md"
                    />
                    <button className='border bg-[#2874f0] text-white text-[1.5rem] px-6 flex justify-center items-center h-[3rem]'>
                        <IoMdSend />
                    </button>
                </form>
            </div>
        </>
    )
}

export default Add_Review