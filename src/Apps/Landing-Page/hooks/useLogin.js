import { useState } from "react"
import useAuth from "./useAuth"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"
import { base_auth }  from '../firebase/base'
import { signInWithEmailAndPassword } from "firebase/auth"


function useLogin(){
    const [loading, setLoading] = useState(false)
    const [error, setError] =  useState(null) 
    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const [, setCookie] = useCookies(['user'])

    const login = async (user, pwd, from) => {
        setLoading(true)
        setError('')
        signInWithEmailAndPassword(base_auth, `${user}@lp.pl`,pwd)
        .then((response)=>{
            if(response.user.email !== undefined || response.user.email !== null){
                setAuth({user, pwd})
                let expires = new Date()
                expires.setTime(expires.getTime() + (10 * 60000)) // 10 minutes
                setCookie('user', user, { path: '/',  expires})
                navigate(from, {replace: true})
            }
        })
        .catch((error)=>{
            setError(error.code.slice(5,error.code.length).replace(/-/g," "))
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    return {login, loading, error}
}

export default useLogin