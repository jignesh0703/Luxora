import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../context/Context'
import { IoMdCart } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import Reviews from '../component/Product/Reviews';

const Product = () => {

    const [Product_Data, setProduct_Data] = useState(null)
    const [MainImage, setMainImage] = useState(null)
    const [AlreadyInCart, setAlreadyInCart] = useState(false)
    const [AddLike, setAddLike] = useState(null)
    const navigate = useNavigate()
    const { apiURL, userdata, setPlace_Orders } = useContext(StoreContext)
    const { id } = useParams()

    useEffect(() => {
        const FetchProductData = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/product/getindivisualproduct/${id}`, {
                    withCredentials: false
                })
                setProduct_Data(response.data.FindProduct)
                if (response.data.FindProduct?.images?.length > 0) {
                    setMainImage(response.data.FindProduct.images[0])
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                }
            }
        }
        FetchProductData()
    }, [id])

    const ChangeMainImages = (image) => {
        setMainImage(image)
    }

    useEffect(() => {
        if (userdata) {
            const CheckAlreadyInWishlist = async () => {
                try {
                    const response = await axios.get(`${apiURL}/api/wishlist/check/${id}`, {
                        withCredentials: true
                    })
                    setAddLike(response.data.inWishlist)
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.message) {
                        toast.error(error.response.data.message);
                    }
                }
            }
            CheckAlreadyInWishlist()
        }
    }, [userdata])

    const ToggleInWishlist = async () => {
        try {
            const response = await axios.post(`${apiURL}/api/wishlist/toggle/${id}`, {}, {
                withCredentials: true
            })
            setAddLike(response.data.inWishlist)
            toast.success(response.data.message)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    const AddToCart = async () => {
        try {
            const response = await axios.post(`${apiURL}/api/cart/add/${id}`, {}, {
                withCredentials: true
            })
            setAlreadyInCart(response.data.Alreadyin)
            if (AlreadyInCart) {
                navigate('/cart')
            }
            toast.success(response.data.message)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    const GetOrder_Data = () => {
        setPlace_Orders(Product_Data)
        navigate('/place_order')
    }

    return (
        <>
            <div className='bg-[#f1f3f6] w-full min-h-screen flex justify-center'>
                <div className='bg-white h-max shadow-md p-2 w-[70%]'>
                    <div className='mt-4 flex gap-6 ml-4'>
                        <div className='flex flex-col'>
                            <div className='border w-max h-max flex'>
                                <div className='flex flex-col h-[25rem] overflow-hidden overflow-y-auto scroll'>
                                    {Product_Data &&
                                        Product_Data.images.map((item, index) => {
                                            return <img
                                                src={item}
                                                alt="product_image"
                                                key={index}
                                                className={`w-[4rem] cursor-pointer p-1 ${MainImage === item ? 'border-blue-500 border-2' : 'border-gray-300 border'} `}
                                                onClick={() => ChangeMainImages(item)}
                                            />
                                        })
                                    }
                                </div>
                                <div className='flex w-max h-max relative'>
                                    <div className='absolute top-[.7rem] right-[1rem] bg-white rounded-full p-3 cursor-pointer shadow-md' onClick={() => ToggleInWishlist()}>
                                        <FaHeart className={`text-[1.2rem] ${AddLike ? 'text-red-500' : 'text-gray-400'} `} />
                                    </div>
                                    <img
                                        src={MainImage}
                                        alt="main_image"
                                        className='w-[25rem] h-[25.5rem] p-2 object-cover'
                                    />
                                </div>
                            </div>
                            <div className='mt-4 flex gap-4'>
                                <button className='flex items-center justify-center gap-2 text-[1.2rem] bg-[#ff9f00] text-white w-[14rem] h-[3rem] font-semibold' onClick={() => AddToCart()}>
                                    <IoMdCart className='text-[1.5rem]' />
                                    {
                                        AlreadyInCart ? <h1>GOING TO CART</h1> : <h1>ADD TO CART</h1>
                                    }
                                </button>
                                <button className='flex items-center justify-center gap-2 text-[1.2rem] bg-[#fb641b] text-white w-[14rem] font-semibold' onClick={GetOrder_Data}>
                                    <AiFillThunderbolt className='text-[1.5rem]' />
                                    <h1>BUY NOW</h1>
                                </button>
                            </div>
                        </div>
                        <Reviews Product_Data={Product_Data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product