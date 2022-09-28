//import { useCookies } from "react-cookie"
import { Navigate, Outlet, useLocation } from "react-router-dom"
//import useAuth from "../hooks/useAuth"
import { base_auth }  from '../firebase/base'

export const RequireAuth = () => {
    //const {auth} = useAuth()
    const location = useLocation()
    const uid = base_auth.currentUser.accessToken
    // const [cookies] = useCookies()
    // let user = null
    // console.log(base_auth.currentUser)
    // const readCookiesSure = () => {
    //     if(cookies.user)
    //         user = cookies.user
    // }
    // if(auth?.user === undefined)
    //     readCookiesSure()
    // else
    //     user = auth?.user
    return(
        base_auth.currentUser !== null
          ? <Outlet context={uid}/>
          : <Navigate to="/login" state={{from: location}} replace />
    )
}