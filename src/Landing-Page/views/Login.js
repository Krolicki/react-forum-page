import { useEffect, useRef, useState } from 'react'
import './styles/Register.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export const Login = () => {
    const {login, loading, error} = useLogin()

    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef()
    const passRef = useRef()
    const errRef = useRef()

    const [errMsg, setErrMsg] = useState('')
    
    useEffect(()=>{
        userRef.current.focus()
        window.scrollTo(0, 0)
    },[])

    useEffect(()=>{
        setErrMsg(error)
    },[error])

    const handleSubmit = async (e) => {
        e.preventDefault()
        login(userRef.current.value, passRef.current.value , from)
    }

    return (
        <div className="register-container">
            <div className='register-form-wrapper'>
                <p ref={errRef} className={errMsg ? "register-errmsg" : "register-offscreen"} aria-live="assertive">{errMsg}</p>
                <div className={loading ? "loader-container" : "register-offscreen"}><span className={loading ? "loader" : "register-offscreen"} aria-live="assertive"></span></div>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>
                            Username:
                        </label>
                        <input 
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={() => {if(errMsg !== '') setErrMsg('')}}
                            required
                        />
                        <label htmlFor='password'>
                            Password:
                        </label>
                        <input 
                            type="password"
                            id="password"
                            ref={passRef}
                            onChange={() => {if(errMsg !== '') setErrMsg('')}}
                            required
                        />

                        <button >
                            Sing in
                        </button>
                    </form>
                    <p className='register-under'>
                        Need an account?
                        <span className='register-link'>
                            <Link to="/register">Sing up</Link>
                        </span>
                    </p>
            </div>
        </div>
    )
}