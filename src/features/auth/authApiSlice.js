import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:builder =>({
        login:builder.mutation({
            query:Credentials =>({
                url:'/api/turfAdmin/login',
                method:'POST',
                body:{...Credentials}
            })
        })
    })
})

export const {
    useLoginMutation
} = authApiSlice