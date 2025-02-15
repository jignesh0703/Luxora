import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/Context'
import { BsBoxSeam } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import { BsPersonVcardFill } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom'

//import Profile Pages
import Profile_Info from '../component/ProfilePage/Profile_Info'
import Manage_Address from '../component/ProfilePage/Manage_Address'
import Reviews from '../component/ProfilePage/Reviews'
import WishList from '../component/ProfilePage/WishList'
import Cart from '../component/ProfilePage/Cart'

const Profile = () => {

    const { userdata } = useContext(StoreContext)
    const Profileicon = <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={50} height={50} viewBox="0 0 50 50" >
        <defs>
            <path id="a" d="M50 0v50H0V0z" />
            <path id="c" d="M0 50h50V0H0z" />
        </defs>
        <g fill="none" fillRule="evenodd">
            <path fill="#EBCFB9" d="M23.05 39.873h4.02v-5.357h-4.02z" />
            <mask id="b" fill="#fff">   <use xlinkHref="#a" />  </mask>
            <path fill="#FFE11B" d="M50 25c0 13.807-11.192 25-25 25C11.193 50 0 38.807 0 25S11.193 0 25 0c13.808 0 25 11.193 25 25" mask="url(#b)" />
            <path fill="#FADDC5" d="M11.418 45.78s-.166-5.062 5.118-7.024c1.96-.727 5.776-.654 8.393-.654 2.54 0 7.468-.107 9.404.596 5.435 1.97 4.635 7.07 4.635 7.07s-4.83 4.06-14.04 4.06c-10.832 0-13.512-4.047-13.512-4.047" />  <path fill="#47C3CF" d="M11.418 45.78s-.166-5.062 5.118-7.024c1.106-.41 2.802-.565 4.54-.624 0 0 .088 4.137 4.252 4.137 4.184 0 4.318-4.14 4.318-4.14 1.866.056 3.682.202 4.688.568 5.435 1.97 4.635 7.07 4.635 7.07s-4.83 4.06-14.04 4.06c-10.832 0-13.512-4.047-13.512-4.047"
            />
            <mask id="d" fill="#fff">
                <use xlinkHref="#c" />
            </mask>
            <path fill="#FADDC5" d="M23.27 39.873h4.02v-5.357h-4.02z" mask="url(#d)" />
            <path fill="#D3B8A3" d="M23.257 35.083h4.03s-.54 1.764-2.008 1.774c-1.468.01-2.023-1.774-2.023-1.774" mask="url(#d)" />
            <path fill="#FADDC5" d="M36.154 23.76c0 6.41-5.027 11.608-11.224 11.608-6.2 0-11.226-5.197-11.226-11.61 0-6.41 5.027-11.61 11.226-11.61 6.197 0 11.224 5.2 11.224 11.61" mask="url(#d)" />
            <path fill="#FFF" d="M26.64 32.27s-.163 1.294-1.28 1.294c-1.116 0-1.46-1.295-1.31-1.295" mask="url(#d)" />
            <path fill="#A56826" d="M18.204 19.192s1.665 5.688 7.124 4.148c7.347-2.073 10.62 2.023 10.826.715v-.296s1.81-13.04-11.225-13.04c-13.036 0-11.225 13.04-11.225 13.04s3.903-.937 4.5-4.568" mask="url(#d)" />
        </g>
    </svg>

    const Components = {
        info: <Profile_Info />,
        addresh: <Manage_Address />,
        reviews: <Reviews />,
        wishlist: <WishList />,
        cart: <Cart />
    }
    const [ActiveComponent, setActiveComponent] = useState('info')

    return (
        <>
            <div className='w-full min-h-screen bg-[#f1f3f6]'>
                <div className='pt-6 flex justify-center gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='w-[18rem] flex bg-white shadow-md p-2 gap-4'>
                            <div>
                                <h1>{Profileicon}</h1>
                            </div>
                            <div>
                                <h1>Hello,</h1>
                                <h1 className='font-bold'>{userdata?.user?.username}</h1>
                            </div>
                        </div>
                        <div className='w-[18rem] bg-white shadow-md'>
                            <div className='flex gap-4 items-center border-b border-gray-300 px-4 py-4'>
                                <BsBoxSeam className='text-[1.8rem]' />
                                <Link to='/order' className='flex w-full'>
                                    <div className='w-full flex items-center justify-between group cursor-pointer transition duration-300'>
                                        <h1 className='font-bold text-gray-500 group-hover:text-[#131921]'>MY ORDERS</h1>
                                        <FaChevronRight className='flex justify-end float-right' />
                                    </div>
                                </Link>
                            </div>
                            <div className='flex border-b border-gray-300 px-4 py-4 flex-col'>
                                <div className='flex gap-4 items-center'>
                                    <BsFillPersonFill className='text-[1.8rem]' />
                                    <a className='w-full flex items-center justify-between transition duration-300'>
                                        <h1 className='font-bold text-gray-500'>ACCOUNT SETTINGS</h1>
                                    </a>
                                </div>
                                <div className='mt-2'>
                                    <h1 className={`pl-10 py-2 duration-200 cursor-pointer ${ActiveComponent === 'info' ? 'font-bold bg-gray-100' : ''} `} onClick={() => setActiveComponent('info')}>Profile Information</h1>
                                    <h1 className={`pl-10 py-2 duration-200 cursor-pointer ${ActiveComponent === 'addresh' ? 'font-bold bg-gray-100' : '' } `} onClick={() => setActiveComponent('addresh')}>Manage Addresh</h1>
                                </div>
                            </div>
                            <div className='flex border-b border-gray-300 px-4 py-4 flex-col'>
                                <div className='flex gap-4 items-center'>
                                    <BsPersonVcardFill className='text-[1.8rem]' />
                                    <a className='w-full flex items-center justify-between transition duration-300'>
                                        <h1 className='font-bold text-gray-500'>MY STUFF</h1>
                                    </a>
                                </div>
                                <div className='mt-2'>
                                    <h1 className={`pl-10 py-2 duration-200 cursor-pointer ${ActiveComponent === 'reviews' ? 'font-bold bg-gray-100' : '' } `} onClick={() => setActiveComponent('reviews')}>My Reviews & Ratings</h1>
                                    <h1 className={`pl-10 py-2 duration-200 cursor-pointer ${ActiveComponent === 'wishlist' ? 'font-bold bg-gray-100' : '' } `} onClick={() => setActiveComponent('wishlist')}>My Wishlist</h1>
                                    <h1 className={`pl-10 py-2 duration-200 cursor-pointer ${ActiveComponent === 'cart' ? 'font-bold bg-gray-100' : '' } `} onClick={() => setActiveComponent('cart')}>My Cart</h1>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center border-b border-gray-300 px-4 py-4'>
                                <LuLogOut className='text-[1.8rem]' />
                                <a className='w-full flex items-center justify-between group cursor-pointer transition duration-300'>
                                    <h1 className='font-bold text-gray-500 group-hover:text-[#131921]'>Logout</h1>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='w-[50rem] bg-white shadow-md'>
                        {Components[ActiveComponent]}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile