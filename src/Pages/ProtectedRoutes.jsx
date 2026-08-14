import React, { useEffect } from 'react'
import { useUserContext } from '../Utils/UserContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoutes = () => {
    const{data, setData} = useUserContext()
    const nav = useNavigate()

    useEffect(() => {

        async function getData(){
            try {
                const data = await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/get-user-data", {withCredentials : true})
                setData(data.data.data)
            } catch (error) {
                nav("/login")
            }

        }

        getData()
        
       
    }, [])


    if(!data)
    {
        return <h1>LOading...</h1>
    }

    return <Outlet />
}

export default ProtectedRoutes