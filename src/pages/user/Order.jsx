import React from 'react'
import Footer from '../../components/user/Footer'
import Navbar from '../../components/user/Navbar'
import ShowOrders from '../../components/user/ShowOrders'

const Order = () => {
  return (
    <div>
        <Navbar/>
        <ShowOrders/>
        <Footer/>
    </div>
  )
}

export default Order