import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import { StoreContext } from '../context/Context'
import axios from 'axios'

const AllProduct = () => {

    const { apiURL } = useContext(StoreContext)
    const [Products, setProducts] = useState([])
    useEffect(() => {
        const FetchProducts = async () => {
            const responce = await axios.get(`${apiURL}/api/product/getallproduct`, {
                withCredentials: true
            })
            setProducts(responce.data.products)
        }
        FetchProducts()
    }, [])

    return (
        <div className='w-[100%] flex justify-center mt-4'>
            <div className='flex w-[80%] gap-[1.8rem] flex-wrap'>
                {
                    Products && Products.map((item, index) => {
                        return <Product id={item._id} images={item.images} name={item.name} key={index}/>
                    })
                }
            </div>
        </div>
    )
}

export default AllProduct