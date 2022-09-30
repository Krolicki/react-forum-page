import { useEffect } from "react"
import { useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
//import useAuth from "../hooks/useAuth"
import { base_auth }  from '../firebase/base'

function RenderAuth({user}){
    const location = useLocation()
    return(
        user !== null
          ? <Outlet context={user}/>
          : <Navigate to="/login" state={{from: location}} replace />
    )
}


export const RequireAuth = () => {
    const [user, setUser] = useState()
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        // base_auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         setUser(base_auth.currentUser.accessToken)
        //     }
        //     else{
        //         setUser(null)
        //     }
        //     setLoad(true)
        // })
        if(base_auth.currentUser){
            setUser(base_auth.currentUser.accessToken)
        }
        else{
            setUser(null)
        }
        setLoad(true)
    },[])

    return(
        <>
            {load && <RenderAuth user={user} />}
        </>
    )
}