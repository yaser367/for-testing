import React, { useEffect, useState } from 'react'
import '../../style/Widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {MdOutlinePersonOutline} from 'react-icons/md'
import {GiShoppingBag} from 'react-icons/gi'
import {MdAdminPanelSettings} from 'react-icons/md'
import { getAllOrder, getAllTurfAdmin, getAllUsers } from '../../helper/helperAdmin';

const Widget = ({type}) => {

  const [apiData,setApiData] = useState([])
  const [turfAdmin,setTurfAdmin] = useState([])
  const [order,setOrder] = useState([])
  const fetchData = async() => {
    const users = await getAllUsers()
    setApiData(users)
    const turfAd = await getAllTurfAdmin()
    setTurfAdmin(turfAd)
    const ord = await getAllOrder()
    setOrder(ord) 
  }

  useEffect(()=>{
    fetchData()
  },[])
  let data;

  switch (type){
    case "User":
      data = {
        title:'USERS',
        isMoney:false,
        link:'See all users',
        icon: <MdOutlinePersonOutline className='p-2  rounded-md self-end bg-green-100' size={40}/>
      };
      break;
      default:
        break;
  }
  switch (type){
    case "Order":
      data = {
        title:'ORDERS',
        isMoney:false,
        link:'See all Orders',
        icon: <GiShoppingBag className='p-2  rounded-md self-end bg-red-100' size={40}/>
      };
      break;
      default:
        break;
  }
  switch (type){
    case "TurfAdmin":
      data = {
        title:'TURF ADMINS',
        isMoney:false,
        link:'See all Turf admins',
        icon: <MdAdminPanelSettings className='p-2  rounded-md self-end bg-orange-100' size={40}/>
      };
      break;
      default:
        break;
  }
  switch (type){
    case "earning":
      data = {
        title:'EARNINGS',
        isMoney:false,
        link:'See all Turf admins',
        icon: <MdAdminPanelSettings className='p-2  rounded-md self-end bg-yellow-100' size={40}/>
      };
      break;
      default:
        break;
  }
console.log(data.title)
  return (
    <div className='flex flex-1 justify-between widget mr-10 p-5 h-[150px]'>
        <div className='left flex flex-col justify-between'>
            <span className='title font-bold text-lg text-gray-400'>{data.title}</span>
            <span className='counter text-2xl'>{ data.title == 'USERS' && apiData?.length || data.title == 'TURF ADMINS'&& turfAdmin.length || data.title == 'ORDERS'&& order.length  }</span>
            <span className='link text-sm border-b-2'>{data.link}</span>
            </div>
        <div className='right flex flex-col justify-between'>
            <div className="percentage flex items-center text-green-500" ><KeyboardArrowUpIcon/>20%</div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget