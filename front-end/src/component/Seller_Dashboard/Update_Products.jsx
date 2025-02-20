import React, { useState } from 'react'

const Update_Products = ({ item }) => {

    const [focusedFields, setfocusedFields] = useState({})
    const [sawFields, setsawFields] = useState({})
    const SawAllFields = (field) => {
        setsawFields((prev) => ({
            ...prev,
            [field]: true
        }))
    }

    const HandleFocus = (field) => {
        setfocusedFields((prev) => ({
            ...prev,
            [field]: true
        }))
    }
    const HandleBlur = (field, e) => {
        if (!e.target.value) {
            setfocusedFields((prev) => ({
                ...prev,
                [field]: false
            }))
        }
    }

    const [formdata, setformdata] = useState({
        name: item.name,
        stock: item.stock,
        price: item.price,
        offer_price: item.offer_price,
        description: item.description
    })

    const ChangeHandler = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault()
    }

    return (
        <div className='border border-slate-300 mt-4 p-6 mr-[3rem] text-[#2874f0] font-bold bg-[#f5faff] mb-[2rem]'>
            <div className='text-[1.2rem]'>
                Update Product Information
            </div>
            <form className='mt-4' onSubmit={SubmitHandler}>
                <div className='flex gap-[3rem]'>
                    <div className='flex gap-[3rem]'>
                        {
                            sawFields.name
                                ? <div>
                                    {
                                        focusedFields.name && <label htmlFor="name" className='absolute text-black ml-4 text-[.8rem] font-bold'>Product Name</label>
                                    }
                                    <input
                                        type="text"
                                        name='name'
                                        value={formdata.name}
                                        onChange={ChangeHandler}
                                        className={`w-[15rem] h-[3rem] border border-slate-300 outline-none pl-4 font-normal text-black ${focusedFields.name ? 'pt-4' : ''}`}
                                        placeholder='Product Name'
                                        onFocus={() => HandleFocus('name')}
                                        onBlur={(e) => HandleBlur('name', e)}
                                    />
                                </div>
                                : <div className='text-base cursor-pointer w-[15rem]' onClick={() => SawAllFields('name')}>
                                    <h1>+ Update Name</h1>
                                </div>
                        }
                    </div>
                    <div className='flex gap-4'>
                        {
                            sawFields.stock
                                ? <div>
                                    {
                                        focusedFields.stock && <label htmlFor="name" className='absolute text-black ml-4 text-[.8rem] font-bold'>Product Stock</label>
                                    }
                                    <input
                                        type="number"
                                        name='stock'
                                        value={formdata.stock}
                                        onChange={ChangeHandler}
                                        className={`w-[15rem] h-[3rem] border border-slate-300 outline-none pl-4 font-normal text-black ${focusedFields.stock ? 'pt-4' : ''}`}
                                        placeholder='Product Stock'
                                        onFocus={() => HandleFocus('stock')}
                                        onBlur={(e) => HandleBlur('stock', e)}
                                    />
                                </div>
                                : <div className='text-base cursor-pointer w-[15rem]' onClick={() => SawAllFields('stock')}>
                                    <h1>+ Update Stock</h1>
                                </div>
                        }

                    </div>
                </div>
                <div className='flex gap-[3rem] mt-[2rem]'>
                    <div className='flex gap-4'>
                        {
                            sawFields.price
                                ? <div>
                                    {
                                        focusedFields.price && <label htmlFor="name" className='absolute text-black ml-4 text-[.8rem] font-bold'>Product Original Price</label>
                                    }
                                    <input
                                        type="number"
                                        name='price'
                                        value={formdata.price}
                                        onChange={ChangeHandler}
                                        className={`w-[15rem] h-[3rem] border border-slate-300 outline-none pl-4 font-normal text-black ${focusedFields.price ? 'pt-4' : ''}`}
                                        placeholder='Product Price'
                                        onFocus={() => HandleFocus('price')}
                                        onBlur={(e) => HandleBlur('price', e)}
                                    />
                                </div>
                                : <div className='text-base cursor-pointer w-[15rem]' onClick={() => SawAllFields('price')}>
                                    <h1>+ Update Original Price</h1>
                                </div>
                        }

                    </div>
                    <div className='flex gap-4'>
                        {
                            sawFields.offer_price
                                ? <div>
                                    {
                                        focusedFields.offer_price && <label htmlFor="name" className='absolute text-black ml-4 text-[.8rem] font-bold'>Product Discounted Price</label>
                                    }
                                    <input
                                        type="number"
                                        name='offer_price'
                                        value={formdata.offer_price}
                                        onChange={ChangeHandler}
                                        className={`w-[15rem] h-[3rem] border border-slate-300 outline-none pl-4 font-normal text-black ${focusedFields.offer_price ? 'pt-4' : ''}`}
                                        placeholder='Product Discounted Price'
                                        onFocus={() => HandleFocus('offer_price')}
                                        onBlur={(e) => HandleBlur('offer_price', e)}
                                    />
                                </div>
                                : <div className='text-base cursor-pointer w-[15rem]' onClick={() => SawAllFields('offer_price')}>
                                    <h1>+ Update Discounted Price</h1>
                                </div>
                        }

                    </div>
                </div>
                <div className='flex gap-[3rem] mt-[2rem]'>
                    {
                        sawFields.description
                            ? <div>
                                {
                                    focusedFields.description && <label htmlFor="description" className='absolute text-black ml-4 text-[.8rem] font-bold'>Product Description</label>
                                }
                                <textarea
                                    type="text"
                                    name='description'
                                    value={formdata.description}
                                    onChange={ChangeHandler}
                                    placeholder='Product Description'
                                    className={`w-[33rem] h-[10rem] border border-slate-300 outline-none pl-4 font-normal text-black resize-none ${focusedFields.description ? 'pt-4' : ''}`}
                                    onFocus={() => HandleFocus('description')}
                                    onBlur={(e) => HandleBlur('description', e)}
                                />
                            </div>
                            : <div className='text-base cursor-pointer w-[15rem]' onClick={() => SawAllFields('description')}>
                                <h1>+ Update Description</h1>
                            </div>
                    }

                </div>
                {
                    (sawFields.name || sawFields.price || sawFields.offer_price || sawFields.stock || sawFields.description) && <div className='mt-8 flex gap-4'>
                        <button className='w-[12rem] h-[3rem] bg-[#2874f0] text-white' type='submit'>SAVE</button>
                        <button className='w-[12rem] h-[3rem] bg-slate-100' onClick={() => setsawFields({})} >Cancel</button>
                    </div>
                }

            </form>
        </div>
    )
}

export default Update_Products