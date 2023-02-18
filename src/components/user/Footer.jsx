import React from 'react'
import {AiFillInstagram ,AiFillTwitterCircle} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'
import { CgSize } from 'react-icons/cg'


const Footer = () => {
  return (
    <div className='footer  bg-sky-700 grid md:grid-cols-4 pt-6 pb-10 grid-cols-3 md:gap-1 gap-8'>
        <div>
        <img src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697349/turfplay_logo_nojsk3.png' className='w-[130px] ' alt="" />

        </div>
        <div>
            <ul>
                <li className='font-bold mb-4'>Pages</li>
                <li>Home</li>
                <li>Service</li>
                <li>About</li>
            </ul>
        </div>
        <div>
            <ul>
                <li className='font-bold mb-4'>Condact Us</li>
                <li>Business Park Calicut</li>
                <li>mob: 7034943897</li>
                <li>yasermuhammed367@gmail.com</li>
            </ul>
        </div>
        <div className='flex md:mt-0 '>
            <AiFillInstagram className='mr-5 sm:ml-5 md:ml-0 ml-5 'size={30}  />
            <AiFillTwitterCircle className='mr-5' size={30} />
            <BsFacebook className='mt-[2px] 'size={27} />
        </div>
    </div>
  )
}

export default Footer