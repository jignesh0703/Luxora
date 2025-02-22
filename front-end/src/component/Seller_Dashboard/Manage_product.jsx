import React, { useContext, useEffect, useState } from 'react'
import Product_List from './Product_List'
import ReviewsEmpty from '../../images/ReviewsEmpty.png'
import { StoreContext } from '../../context/Context'
import axios from 'axios'

const Manage_product = () => {

  const { apiURL } = useContext(StoreContext)
  const [Products, setProducts] = useState([])
  const [trackproducts, settrackproducts] = useState(false)

  useEffect(() => {
    const FetchProducts = async () => {
      const responce = await axios.get(`${apiURL}/api/product/getsellerproduct`, {
        withCredentials: true
      })
      setProducts(responce.data.FindProducts)
    }
    FetchProducts()
  }, [trackproducts])

  return (
    <>
      <div className="mt-4 pb-10">
        <div className="font-bold w-full text-[1.5rem] ml-[3rem]">
          <h1>Manage Products</h1>
        </div>
        {
          Products?.length === 0
            ? <div className='w-full h-full flex flex-col gap-8 justify-center items-center mt-[5rem]'>
              <div className='w-full flex justify-center'>
                <img src={ReviewsEmpty} alt="ReviewsEmpty_image" className='w-max' />
              </div>
              <div className='flex gap-2 flex-col text-center'>
                <h1 className='font-bold text-[1.2rem]'>No products Uploaded</h1>
                <h1>You have not uploaded any products!</h1>
              </div>
            </div>
            : <div className='ml-[3rem]'>
              <div className='mt-4'>
                <div className='flex w-max font-bold'>
                  <h1 className='w-[12rem]'>Name</h1>
                  <h1 className='w-[8rem] text-center'>Price</h1>
                  <h1 className='w-[8rem] text-center'>Discounted Price</h1>
                  <h1 className='w-[8rem] text-center'>Stock</h1>
                  <h1 className='w-[8rem] text-center'>Actions</h1>
                </div>
                {
                  Products && Products.map((item, index) => {
                    return < Product_List item={item} key={index} trackproducts={trackproducts} settrackproducts={settrackproducts} />
                  })
                }
              </div>
            </div>
        }
      </div>
    </>
  )
}

export default Manage_product