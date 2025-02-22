import React, { useContext } from 'react'
import { StoreContext } from '../context/Context'
import Address from '../component/Place_Order/Address'

const Place_Order = () => {

  const { Place_Orders } = useContext(StoreContext)

  return (
    <>
      <div className='bg-[#f1f3f6] w-full min-h-screen flex justify-center'>
        <Address />
      </div>
    </>
  )
}

export default Place_Order