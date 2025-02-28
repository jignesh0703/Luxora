import React, { useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../../context/Context'
import { toast } from 'react-toastify'

const Order_Status = ({ Order_Data, settrackorder, trackorder }) => {

  const { apiURL } = useContext(StoreContext)
  const statusColors = {
    Processing: "bg-yellow-500",
    Shipped: "bg-blue-500",
    OutForDelivery: "bg-orange-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  const ChangeStatus = async (status, id) => {
    try {
      const response = await axios.post(`${apiURL}/api/order/changestatus/${id}`, { status }, {
        withCredentials: true
      })
      settrackorder(!trackorder)
      toast.success(response.data.message)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <>
      <h1 className='flex justify-center mt-4 text-[1.7rem] font-bold'>Orders</h1>
      <div className='p-8'>
        <div className='flex w-max font-bold items-center'>
          <h1 className='w-[12rem]'>ID</h1>
          <h1 className='w-[12rem]'>Date</h1>
          <h1 className='w-[12rem]'>Price</h1>
          <h1 className='w-[15rem]'>Status</h1>
        </div>
        {
          Order_Data && Order_Data.map((item, index) => {

            const notallow = item.orderStatus === 'Cancelled'

            return <div className='flex w-max font-bold text-gray-400 items-center mt-4' key={index}>
              <h1 className='w-[12rem]'>
                {index + 1}
              </h1>
              <h1 className='w-[12rem]'>
                {new Date(item.createdAt).toLocaleDateString('en-IN')}
              </h1>
              <h1 className='w-[10rem]'>
                ₹{(item.total_price).toLocaleString('en-IN')}
              </h1>
              <div className='flex gap-2 items-center'>
                <select
                  className={`border p-2 rounded outline-none 
                    ${notallow ? 'cursor-not-allowed' : ''}
                    `}
                  onChange={(e) => ChangeStatus(e.target.value, item._id)}
                  defaultValue={item.orderStatus}
                  disabled={notallow}
                >
                  {
                    Object.keys(statusColors).map((item, index) => {
                      return <option
                        value={item}
                        key={index}>
                        {item}
                      </option>
                    })
                  }
                </select>
              </div>
            </div>
          })
        }
      </div>
    </>
  )
}

export default Order_Status