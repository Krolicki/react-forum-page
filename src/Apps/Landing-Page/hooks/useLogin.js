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

    const successfullyLoged = async (uid, user, from) =>{
        let loginCount = 0
        await fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/users/${user.toLowerCase()}.json?auth=${uid}`)
        .then((response) => {
            if(response.ok){
                return response.json()
            }
            else
                throw response
        })
        .then((response)=>{
            if(response?.username){
                setAuth({user: response.username})
                let expires = new Date()
                expires.setTime(expires.getTime() + (10 * 60000)) // 10 minutes
                setCookie('user', response.username, { path: '/',  expires})
                if(response?.loginCount)
                    loginCount += response.loginCount + 1
                else
                    loginCount = 1 
                navigate(from, {replace: true})
            }
            else{
                setError("Login failed")
            }
        })
        .catch((err)=>{
            console.log(err)
            if(!err?.response){
                setError("No server response")
            }
            else{
                setError("Login failed")
            }
        })
        let date = new Date()
        let lastLogged = `${('0'+date.getDate()).slice(-2)}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getFullYear()} ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`
        fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/users/${user.toLowerCase()}.json?auth=${uid}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                loginCount,
                lastLogged
            })
        })
        .then(respsonse => {
            if(respsonse.ok){
                return respsonse
            }
            throw respsonse
        })
        .catch(err => {
            console.log("Updating profile failed... " + err)
        })
    }

    const login = async (user, pwd, from) => {
        setLoading(true)
        setError('')
        signInWithEmailAndPassword(base_auth, `${user}@lp.pl`,pwd)
        .then((response)=>{
            if(response.user.email !== undefined || response.user.email !== null){
                successfullyLoged(response.user.accessToken, user, from)
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