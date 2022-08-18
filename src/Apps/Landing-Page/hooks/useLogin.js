import { useState } from "react"


function useLogin(){ //FOR TESTING ONLY
    const [userDataBase, setUserDataBase] = useState([]) 
    const [loading, setLoading] = useState(false)
    const [error, setError] =  useState(null) 
    const [successLogin, setSuccessLogin] = useState(null)

    const auth = (user, pwd) => {
        userDataBase.map((userData)=>{
            if(userData.user === user && userData.pwd === pwd){
                setSuccessLogin(true)
                return
            }
        })
        setError("Wrong username or password")
    }

    const login = (user, pwd) => {
        setLoading(true)
        setError('')
        fetch('http://localhost:5000/users')
            .then((response) => {
                if(response.ok)
                    return response
                throw response
            })
            .then(response => response.json())
            .then(response => {
                setUserDataBase(response)
                auth(user,pwd)
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