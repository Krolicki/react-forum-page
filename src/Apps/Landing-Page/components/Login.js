import { useEffect, useRef, useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import useAuth from '../hooks/useAuth';

export const Login = () => {
    const {login, loading, successLogin, error} = useLogin()

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    
    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrMsg('')
    },[user, pwd])

    useEffect(()=>{
        setErrMsg(error)
    },[error])

    const handleSubmit = async (e) => {
        e.preventDefault()
        login(user, pwd)
    }

    return (
        <div className="register-container">
        {successLogin ? (
            <div className='register-form-wrapper'>
                <h1>Hello {user}!</h1>
                <p>You are loggen in.</p>
                <span className='register-link'>
                    <Link to="/">Go to Home</Link>
                </span>
            </div>
        ) : (
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
                                onChange={(e) => {setUser(e.target.value)}}
                                value={user}
                                required
                            />


                            <label htmlFor='password'>
                                Password:
                            </label>
                            <input 
                                type="password"
                                id="password"
                                onChange={(e) => {setPwd(e.target.value)}}
                                required
                                value={pwd}
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
        )}
         </div>
    )
}