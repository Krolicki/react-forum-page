import { useState } from "react"
import useAuth from "./useAuth"


function useLogin(){
    const [loading, setLoading] = useState(false)
    const [error, setError] =  useState(null) 
    const [successLogin, setSuccessLogin] = useState(null)
    const {setAuth} = useAuth()

    const login = async (user, pwd, from) => {
        setLoading(true)
        setError('')
        await fetch(`http://localhost:5000/users/?user=${user}&pwd=${pwd}`)
            .then((response) => {
                if(response.ok)
                    return response
                throw response
            })
            .then(response => response.json())
            .then(response => {
                if(response.length !== 0){
                    setSuccessLogin(true)
                    setAuth({user, pwd})
                }
                else{
                    setError("Wrong username or password")
                }
            })
            .catch(()=>{
                setError(`No connection to server`)
            })
            .finally(()=>{
                setLoading(false)
            })
    }

    return {login, loading, successLogin, error}
}

export default useLogin