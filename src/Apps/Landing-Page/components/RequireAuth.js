import { useEffect } from "react"
import { useState } from "react"
import { useCookies } from "react-cookie"
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
    //const {auth} = useAuth()
    const location = useLocation()
    const [cookies] = useCookies()
    const [user, setUser] = useState()
    const [load, setLoad] = useState(false)

    // const readCookiesSure = () => {
    //     if(cookies.uid)
    //         user = cookies.user
    // }
    useEffect(()=>{
        base_auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(base_auth.currentUser.accessToken)
            }
            else{
                setUser(null)
            }
            setLoad(true)
        })
    },[])
    // if(base_auth?.currentUser === undefined)
    //     readCookiesSure()
    // else
    //     user = auth?.user
    return(
        <>
            {load && <RenderAuth user={user} />}
        </>
    )

    // return(
    //     base_auth.currentUser !== null || user !== null
    //       ? <Outlet context={base_auth.currentUser.accessToken}/>
    //       : <Navigate to="/login" state={{from: location}} replace />
    // )
}