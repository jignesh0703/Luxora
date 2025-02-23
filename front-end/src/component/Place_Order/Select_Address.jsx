import React from 'react'

const Select_Address = ({ Address_Data, MainAddress, setMainAddress, setsawFirst_Part, setgetAddress }) => {

    return (
        <div className='flex flex-col'>
            {
                Address_Data && Address_Data.map((address, index) => {
                    return <div className={`p-4 px-8 border-b w-full h-max ${MainAddress === address && 'bg-blue-50'}`} key={index}>
                        <label
                            className={`cursor-pointer flex items-center gap-4 `}
                        >
                            <input
                                type="radio"
                                name="selectedAddress"
                                checked={MainAddress === address}
                                onChange={() => {
                                    setMainAddress(address)
                                    setgetAddress(address._id)
                                }}
                                className='cursor-pointer w-[1.1rem] h-[1.1rem]'
                            />
                            <div className='flex flex-col'>
                                <div className='flex gap-4'>
                                    <h1 className='font-semibold'>{address?.name}</h1>
                                    <h1 className='font-semibold bg-gray-200 text-[.8rem] flex justify-center items-center text-gray-500 px-2 rounded-[5px]'>{(address?.address_type).toUpperCase()}</h1>
                                    <h1 className='font-semibold'>{address?.number}</h1>
                                </div>
                                <div className='flex gap-2'>
                                    <h1>{address?.address}</h1>
                                    <h1>{address?.city}</h1>
                                    <h1>{address?.state}</h1>
                                    <h1>-</h1>
                                    <h1 className='font-semibold'>{address?.pincode}</h1>
                                </div>
                            </div>
                        </label>
                        {
                            MainAddress === address && <button className='bg-[#fb641b] text-white font-bold ml-[2rem] w-[15rem] h-[3rem] mt-4' onClick={() => setsawFirst_Part(false)}>DELIVER HERE</button>
                        }
                    </div>
                })
            }
        </div>
    )
}

export default Select_Address