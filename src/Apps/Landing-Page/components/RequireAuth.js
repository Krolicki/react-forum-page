import { useEffect } from "react"
import { useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { base_auth }  from '../firebase/base'
import { signOut } from "firebase/auth"

function RenderAuth({user}){
    const location = useLocation()
    const {auth} = useAuth()

    if(user !== null && user !== undefined){
        if(auth.user !== undefined )
            return <Outlet context={user.accessToken}/>
        else
            signOut()
    }
    return <Navigate to="/login" state={{from: location}} replace />
    // return(
    //     user !== null && user !== undefined
    //       ? <Outlet context={user}/>
    //       : <Navigate to="/login" state={{from: location}} replace />
    // )
}


export const RequireAuth = () => {
    const [user, setUser] = useState()
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        base_auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(base_auth.currentUser)
            }
            else{
                setUser(null)
            }
            setLoad(true)
        })
        // if(base_auth.currentUser){
        //     setUser(base_auth.currentUser.accessToken)
        // }
        // else{
        //     setUser(null)
        // }
    },[])

    return(
        <>
            {load && <RenderAuth user={user} />}
        </>
    )
}