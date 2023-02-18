import React from 'react'


const ThirdComponent = () => {
  return (
    <div className='grid md:grid-cols-3 gap-8   md:py-40 bg-white'>
       
        <div className='flex items-center flex-col  '> 
        <img className='w-[40%]' src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697348/searchIcon_ailnmo.svg' alt="" />
        <h2 className='text-2xl font-bold mt-4'>Search</h2>
        <p className='text-center mt-2'>Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities whole over the Kerala</p>
        </div>

        <div className='flex items-center flex-col md:my-0 my-24'>
        <img className='w-[40%]' src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697346/bookIcon_houkog.svg' alt="" />
        <h2 className='text-2xl font-bold mt-4'>Book</h2>
        <p className='text-center mt-2'>Once you’ve found the perfect ground, court or gym, Connectwith the venue through the Book Now Button to make online booking & secure easier payment</p>
        </div>

        <div className='flex items-center flex-col md:my-0 my-24'>
        <img className='w-[40%]' src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697348/PlayIcon_fhyl8y.svg' alt="" />
        <h2 className='text-2xl font-bold mt-4'> Play</h2>
        <p className='text-center mt-2'>Once you’ve found the perfect ground, court or gym, Connect with the venue through the Book Now Button to make online booking & secure easier payment</p>

        </div>

    </div>
  )
}

export default ThirdComponent