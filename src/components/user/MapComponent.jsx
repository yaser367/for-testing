import React from 'react'

const MapComponent = () => {
  return (
    <div className='bg-white w-full grid md:grid-cols-2 md:gap-20'>
        <div className='max-w-[1240px] mx-auto grid   md:py-20'>
            <img className='md:h-[80vh] sm:h-[400px] h-[300px]' src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697347/keralamap_zwesf3.png' alt="" />

        </div>
        <div className='flex flex-col justify-center text-center md:bg-amber-400 items-center py-16'>
        <h1 className='text-dark font-bold text-2xl tracking-widest md:text-amber-100   uppercase'>In 50+ cities across <br />Kerala </h1><br />
            <h1 className='text-dark  text-lg md:text-white '>Book Your Nearest </h1>
            <h1 className='text-dark  text-lg md:text-white'>Turf</h1>
            <button type="button" class="inline-block w-28 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out mt-2">Book Now</button>
        </div>

    </div>
  )
}

export default MapComponent