import React,{useEffect} from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameValidate } from '../../helper/validateUser'
import { useAuthStore } from '../../store'

import styles from '../../style/Username.module.css'

const UserName = () => {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername)

  // useEffect(()=>{
  //   const  token = localStorage.getItem('token')

  //   if(token){
  //     Navigate('/home')
  //   }else{
  //     Navigate('/login')
  //   }
  // },[])

  const formik = useFormik({
    initialValues:{
      username:''
    },
    validate:usernameValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values =>{
     setUsername(values.username);
     navigate('/password')
    }
  })
  return (
    <div className={styles.background_img}>
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
           <h4 className='md:text-2xl text-lg font-bold'>Hello Again!</h4>
           <span className='py-4 md:text-xl w-2/3 text-center text-gray-500'>Explore more by connecting with us</span>

          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={styles.profile_img} src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697293/avatar_d2vzjc.png' alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username'/>
              <div  >
              <button className='border bg-indigo-700 hover:bg-red-500  py-2 px-5 rounded-lg text-gray-50 text-xl shadow-sm text-center' type='submit'> let's go</button>

              </div>
            </div>
            <div className="text-center py-4">
              <span className='text-grey-500'>
                Not a Member? <Link to="/register" className='text-red-500'>Register Now</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    )
}

export default UserName

