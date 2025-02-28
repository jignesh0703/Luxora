import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/Context'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaChevronRight, FaWallet } from 'react-icons/fa6'
import { MdSpaceDashboard, MdManageAccounts, MdSupportAgent } from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";

//import from seller_dashboard
import Profile from '../component/Seller_Dashboard/Profile';
import Dashboard from '../component/Seller_Dashboard/Dashboard';
import Add_Product from '../component/Seller_Dashboard/Add_Product';
import Manage_product from '../component/Seller_Dashboard/Manage_product';
import Orders from '../component/Seller_Dashboard/Orders';
import Order_Status from '../component/Seller_Dashboard/Order_Status';
import Earning from '../component/Seller_Dashboard/Earning';
import Support from '../component/Seller_Dashboard/Support';
import { toast } from 'react-toastify';
import axios from 'axios';

const Seller_Dashboard = () => {

    const { userdata, apiURL } = useContext(StoreContext)
    const [trackorder, settrackorder] = useState(false)
    const [Order_Data, setOrder_Data] = useState(null)
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
    const Componets = {
        profile: <Profile />,
        dashboard: <Dashboard Order_Data={Order_Data} />,
        add_product: <Add_Product />,
        manage_product: <Manage_product />,
        orders: <Orders Order_Data={Order_Data} />,
        order_status: <Order_Status Order_Data={Order_Data} trackorder={trackorder} settrackorder={settrackorder}/>,
        earning: <Earning />,
        support: <Support />
    }

    const [ActiveComponent, setActiveComponent] = useState('profile')

    const GetOrders = async () => {
        try {
            const response = await axios.get(`${apiURL}/api/order/getseller`, {
                withCredentials: true
            })
            setOrder_Data(response.data.FindOrder)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }
    useEffect(() => {
        GetOrders()
    }, [apiURL, trackorder])

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
                                <h1 className='font-bold'>{userdata?.Seller?.fullname}</h1>
                            </div>
                        </div>
                        <div className='w-[18rem] bg-white shadow-md'>
                            <div className='flex border-b border-gray-300 px-4 py-4 flex-col'>
                                <div className={` flex gap-4 items-center font-bold ${ActiveComponent === 'profile' ? 'text-black bg-gray-100' : 'text-gray-500'} `} onClick={() => setActiveComponent('profile')}>
                                    <BsFillPersonFill className='text-[1.8rem] text-black' />
                                    <div className='w-full flex items-center justify-between group cursor-pointer transition duration-300'>
                                        <h1 className='group-hover:text-[#131921]'>Seller Profile</h1>
                                        <FaChevronRight className='flex justify-end float-right' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex border-b border-gray-300 px-4 py-4 flex-col'>
                                <div className={` flex gap-4 items-center font-bold ${ActiveComponent === 'dashboard' ? 'text-black bg-gray-100' : 'text-gray-500'} `} onClick={() => setActiveComponent('dashboard')}>
                                    <MdSpaceDashboard className='text-[2rem] text-black' />
                                    <div className='w-full flex items-center justify-between group cursor-pointer transition duration-300'>
                                        <h1 className='group-hover:text-[#131921]'>Dashboard</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex border-b border-gray-300 px-4 py-4 flex-col'>
                                <div className='flex gap-4 items-center'>
                                    <MdManageAccounts className='text-[2rem]' />
                                    <a className='w-full flex items-center justify-between transition duration-300'>
                                        <h1 className='font-bold text-gray-500'>Product Management</h1>
                                    </a>
                                </div>
                                <div className='mt-2'>
                                    <h1 className={`pl-10 py-2 duration-200 cursor-pointer ${ActiveComponent === 'add_product' ? 'font-bold bg-gray-100' : ''} `} onClick={() => setActiveComponent('add_product')}>Add New Product</h1>
                                    <h1 className={`pl-10 py-2 duration-200 cursor-pointer ${ActiveComponent === 'manage_product' ? 'font-bold bg-gray-100' : ''} `} onClick={() => setActiveComponent('manage_product')}>Manage Products</h1>
                                </div>
                            </div>
                            <div className='flex border-b border-gray-300 px-4 py-4 flex-col'>
                                <div className='flex gap-4 items-center'>
                                    <RiShoppingBag3Fill className='text-[1.8rem]' />
                                    <a className='w-full flex items-center justify-between transition duration-300'>
                                        <h1 className='font-bold text-gray-500'>Order Management</h1>
                                    </a>
                                </div>
                                <div className='mt-2'>
                                    <h1 className={`pl-10 py-2 duration-200 cursor-pointer ${ActiveComponent === 'orders' ? 'font-bold bg-gray-100' : ''} `} onClick={() => setActiveComponent('orders')}>View Orders</h1>
                                    <h1 className={`pl-10 py-2 duration-200 cursor-pointer ${ActiveComponent === 'order_status' ? 'font-bold bg-gray-100' : ''} `} onClick={() => setActiveComponent('order_status')}>Update Order Status</h1>
                                </div>
                            </div>
                            <div className='flex border-b border-gray-300 px-4 py-4 flex-col'>
                                <div className={` flex gap-4 items-center font-bold ${ActiveComponent === 'earning' ? ' text-black bg-gray-100' : 'text-gray-500'} `} onClick={() => setActiveComponent('earning')}>
                                    <FaWallet className='text-[1.8rem] text-black' />
                                    <div className='w-full flex items-center justify-between group cursor-pointer transition duration-300'>
                                        <h1 className='font-bold group-hover:text-[#131921]'>Earnings & Payouts</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex border-b border-gray-300 px-4 py-4 flex-col'>
                                <div className={` flex gap-4 items-center font-bold ${ActiveComponent === 'support' ? ' text-black bg-gray-100' : 'text-gray-500'} `} onClick={() => setActiveComponent('support')}>
                                    <MdSupportAgent className='text-[1.8rem] text-black' />
                                    <div className='w-full flex items-center justify-between group cursor-pointer transition-all duration-300'>
                                        <h1 className='font-bold group-hover:text-[#131921]'>Support & Notifications</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[50rem] bg-white shadow-md'>
                        {Componets[ActiveComponent]}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Seller_Dashboard