import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/Context';
import Update_Products from './Update_Products';

const Product_List = ({ item, settrackproducts, trackproducts }) => {

    const { apiURL } = useContext(StoreContext)
    const [sawdropref, setsawdropref] = useState(false)
    const dropref = useRef()
    const [showUpdate, setshowUpdate] = useState(false)

    useEffect(() => {
        const HandlerClickOutSide = (e) => {
            if (dropref.current && !dropref.current.contains(e.target)) {
                setsawdropref(false)
            }
        }
        document.addEventListener('mousedown', HandlerClickOutSide)
        return () => {
            document.removeEventListener('mousedown', HandlerClickOutSide)
        }
    }, [])

    const DeleteProduct = async (id) => {
        try {
            const responce = await axios.delete(`${apiURL}/api/product/delete/${id}`, {
                withCredentials: true
            })
            settrackproducts(!trackproducts)
            setsawdropref(false)
            toast.success(responce.data.message)
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <>
            <div className='flex w-max font-bold items-center mt-4 text-gray-500'>
                <h1 className="w-[12rem] truncate whitespace-nowrap overflow-hidden">{item.name}</h1>
                <h1 className="w-[8rem] text-center">{item.price}</h1>
                <h1 className="w-[8rem] text-center">{item.offer_price}</h1>
                <h1 className="w-[8rem] text-center">{item.stock}</h1>
                <div>
                    <h1 className='w-[8rem] flex justify-center items-center text-[1.2rem]'>
                        <HiOutlineDotsVertical className='cursor-pointer' onClick={() => setsawdropref(true)} />
                    </h1>
                    {
                        sawdropref && <div className="absolute -ml-[3rem] -mt-[.5rem] w-28 bg-white border rounded-lg shadow-lg" ref={dropref}>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => {
                                    setshowUpdate(prev => !prev)
                                    setsawdropref(false)
                                }}
                            >
                                ✏️ Edit
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => DeleteProduct(item._id)}>
                                🗑️ Delete
                            </button>
                        </div>
                    }
                </div>
            </div>
            {
                showUpdate && <Update_Products item={item} setshowUpdate={setshowUpdate} settrackproducts={settrackproducts} trackproducts={trackproducts} />
            }
        </>
    )
}

export default Product_List