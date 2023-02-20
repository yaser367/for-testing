import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helperUser";

axios.defaults.baseURL = import.meta.env.VITE_API_SERVER_DOMAIN;

/** custom hook */
export default function useFetch(query){
   const [getdata, setData] = useState({isLoading:false, apiData:undefined,status:null, severError:null })

   useEffect(()=>{

    const fetchData = async ()=>{
        try {
            setData(prev => ({...prev, isLoading:true}))
            const {username} = !query ? await getUsername() :'';
            const {data, status} = !query ? await axios.get(`api/user/${username}`) : await axios.get(`/api/${query}`)
            if(status ===200){
            setData(prev => ({...prev, isLoading:false}))
            setData(prev => ({...prev, apiData:data,status:status}))

            }
            
        } catch (error) {
            setData(prev => ({...prev, isLoading:false, severError:error}))
        }
    };
    fetchData()

   },[query]);
   return [getdata,setData]
}

