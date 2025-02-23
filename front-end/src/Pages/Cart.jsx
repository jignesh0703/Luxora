import React, { useContext, useEffect, useState } from 'react'
import Cart_component from '../component/Cart/Cart_component'
import { StoreContext } from '../context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'
import PriceDetail from '../component/Cart/PriceDetail'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const { apiURL, setPlace_Orders, setisCartUsed } = useContext(StoreContext)
    const [CartData, setCartData] = useState([])
    const [trackcart, settrackcart] = useState(false)
    const Navigate = useNavigate()

    useEffect(() => {
        const FetchCart = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/cart/get`, {
                    withCredentials: true
                })
                setCartData(response.data.FindUser.Products)
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                }
            }
        }
        FetchCart()
    }, [trackcart])

    const GetOrder_Data = () => {
        setPlace_Orders(CartData)
        setisCartUsed(true)
        Navigate('/place_order')
    }

    return (
        <>
            <div className='w-full min-h-screen bg-[#f1f3f6] flex justify-center gap-4'>
                <div className='mt-4 flex flex-col gap-2'>
                    <div className='bg-white w-[50rem] h-[3rem] shadow-md text-[1.5rem] font-bold flex justify-center items-center gap-2'>
                        <h1>Cart</h1>
                        <h1>({CartData.length})</h1>
                    </div>
                    <div className={`bg-white w-[50rem] h-max ${CartData.length > 0 ? 'shadow-md' : 'shadow-none'}`}>
                        {
                            CartData.length > 0 ? (
                                CartData.map((item, index) => {
                                    return <Cart_component item={item} key={index} trackcart={trackcart} settrackcart={settrackcart} />
                                })
                            ) : (
                                <h1 className='flex justify-center text-[2rem] font-semibold bg-[#f1f3f6] pt-4'>Cart is Empty</h1>
                            )
                        }
                        {
                            CartData?.length > 0
                            && <div className='py-4 flex justify-end bottom-0 sticky bg-white shadow-md border-t border'>
                                <div className='px-4'>
                                    <button className='w-[15rem] h-[3rem] bg-[#fb641b] text-white font-semibold' onClick={GetOrder_Data}>PLACE ORDER</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <PriceDetail CartData={CartData} />
            </div>
        </>
    )
}

export default Cart