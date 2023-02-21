import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store";

export const AuthorizeUser = ({children}) =>{
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children; 
}

export const ProtectRout = ({children})=>{
    const username = useAuthStore.getState().auth.username;
    if(!username) {
        return <Navigate to= {'/login'} replace={true}></Navigate>
    }
    return children;
}

export const homeAuth = ()=>{
    const token = localStorage.getItem('token')
    if(!token){
         <Navigate to='/login'></Navigate>
    }
    
}

export const logAuth = ()=>{
    const token = localStorage.getItem('token')

    return token ? <Outlet/> : <Navigate to='/login'/>
}