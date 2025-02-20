import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/Context'
import axios from 'axios'
import WishListS from '../WishList/WishList'

const WishList = () => {

  const { apiURL } = useContext(StoreContext)
  const [WishListData, setWishListData] = useState(null)
  const [trackwishlist, settrackwishlist] = useState(false)

  useEffect(() => {
    const FetchWishList = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/wishlist/fetch`, {
          withCredentials: true
        })
        if (response.data.wishlist.Products.length === 0) {
          setWishListData(null)
        } else {
          setWishListData(response.data.wishlist.Products)
        }
      } catch (error) {
        setWishListData(null)
      }
    }
    FetchWishList()
  }, [trackwishlist])

  return (
    <>
      <div className=''>
        <div className='border font-bold text-[1.5rem] p-4 px-8'>
          <h1>My WishList ({WishListData? WishListData.length : 0})</h1>
        </div>
        <div>
          <div>
            {
              WishListData && WishListData.map((item, index) => {
                return <WishListS item={item} key={index} trackwishlist={trackwishlist} settrackwishlist={settrackwishlist} />
              })
            }
          </div>
          <div>
            {
              !WishListData && <h1 className='w-full flex justify-center text-[1.5rem] font-semibold mt-[3rem]'>WishList is Empty!</h1>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default WishList