import React from "react";
axios.defaults.baseURL = import.meta.env.VITE_API_SERVER_DOMAIN;
import axios from "axios";
import { useEffect, useState } from "react";

const usepagination = (endPoint,pageIndex) => {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [lists,setLists] = useState([])
    const [hasMore,setHasMore] = useState(false)

    console.log(pageIndex)
    useEffect(()=>{
        setLoading(true)
        setError(false)
        let cancel;
        axios.get(`api/${endPoint}${pageIndex}`,{
            cancelToken:new axios.CancelToken(c=> cancel = c)
        }).then(res =>{
            console.log(res.data)
            setLists(prevList =>{
                return [...prevList,...res.data.map(b=>b)]
            })
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(e =>{
            if(axios.isCancel(e)) return
            console.log(e)
            setError(true)
        })
        return () =>cancel()

    },[pageIndex])
  return {loading,error,lists,hasMore}
};

export default usepagination;
