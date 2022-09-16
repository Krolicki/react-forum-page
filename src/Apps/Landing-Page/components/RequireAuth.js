import { useCookies } from "react-cookie"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export const RequireAuth = () => {
    const {auth} = useAuth()
    const location = useLocation()
    const [cookies] = useCookies()
    let user = null

    const readCookiesSure = () => {
        if(cookies.user)
            user = cookies.user
    }
    if(auth?.user === undefined)
        readCookiesSure()
    else
        user = auth?.user
    return(
        user !== null
          ? <Outlet />
          : <Navigate to="/login" state={{from: location}} replace />
    )
}