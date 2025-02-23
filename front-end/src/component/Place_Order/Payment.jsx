import React from 'react'
import { MdOutlinePayment } from "react-icons/md";

const Payment = ({ formdata, setformdata, SubmitHandler }) => {

    const ChangeHandler = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='bg-white shadow-md w-[50rem] p-4 px-8'>
            <div className='flex gap-2 w-full'>
                <MdOutlinePayment className='text-[1.5rem]' />
                <h1 className='font-bold text-gray-400'>PAYMENT METHOD</h1>
            </div>
            <form className='flex flex-col gap-4 mt-4 border p-4 rounded-[5px]' onSubmit={SubmitHandler}>
                <div className='flex gap-12'>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-[1.1rem] font-semibold font-serif'>Cardholder Name</label>
                        <input
                            type="text"
                            name='holdername'
                            placeholder='cardholder name'
                            value={formdata.holdername}
                            onChange={ChangeHandler}
                            className='border-b border-gray-300 w-[20rem] text-[1.3rem] outline-none py-2 font-semibold font-serif'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-[1.1rem] font-semibold font-serif'>Card Number</label>
                        <input
                            type="number"
                            name='card_number'
                            placeholder='0000 0000 0000 0000'
                            value={formdata.card_number}
                            onChange={(e) => {
                                if (e.target.value.length <= 16) {
                                    ChangeHandler(e)
                                }
                            }}
                            className='border-b border-gray-300 w-[20rem] text-[1.3rem] outline-none py-2 font-semibold'
                            required
                        />
                    </div>
                </div>
                <div className='flex gap-12'>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-[1.1rem] font-semibold font-serif'>Expiry Date (MM/YY)</label>
                        <input
                            type="month"
                            name='exipry_date'
                            value={formdata.exipry_date}
                            onChange={ChangeHandler}
                            className='border-b border-gray-300 w-[20rem] text-[1.3rem] outline-none py-2 font-semibold font-serif'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-[1.1rem] font-semibold font-serif'>CVV</label>
                        <input
                            type="number"
                            name='cvv'
                            placeholder='000'
                            value={formdata.cvv}
                            onChange={(e) => {
                                if (e.target.value.length <= 3) {
                                    ChangeHandler(e)
                                }
                            }}
                            className='border-b border-gray-300 w-[20rem] text-[1.3rem] outline-none py-2 font-semibold'
                            required
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <button className='w-[15rem] h-[2.5rem] bg-blue-400 text-white font-bold rounded-[5px]'>PAY</button>
                </div>
            </form>
        </div>
    )
}

export default Payment