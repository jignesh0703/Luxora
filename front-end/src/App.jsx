import React from 'react'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { ToastContainer } from 'react-toastify'
import Profile from './Pages/Profile'
import Order from './Pages/Order'
import Become_Seller from './Pages/Become_Seller'
import Seller_Dashboard from './Pages/Seller_Dashboard'
import Product from './Pages/Product'
import Cart from './Pages/Cart'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/order' element={<Order />} />
        <Route path='/seller' element={<Become_Seller />} />
        <Route path='/dashboard' element={<Seller_Dashboard />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App