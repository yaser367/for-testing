import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccessPage = () => {
  return (
    <div className='bg-white md:min-h-[720px] p-5 min-h-[820px]'>
        <p className='text-center text-4xl text-green-600'>Payment Success</p>
        <div className='flex justify-center mt-5'>
            
        <img className='w-[300px]' src="https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676975626/turf/3891942_ljeznm.jpg" alt="" />
        </div>
        <div className='flex justify-center'>
            <p>want to go home page</p><Link to='/'><p className='ml-2 text-blue-500'>Home</p></Link>
        </div>
    </div>
  )
}

export default OrderSuccessPage