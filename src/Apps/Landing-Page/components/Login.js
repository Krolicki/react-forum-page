import { useEffect, useRef, useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom';

export const Login = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(()=>{
        //userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrMsg('')
    },[user, pwd])

    const handleSubmit = async (e) => {

    }

    return (
        <div className="register-container">
            <div className='register-form-wrapper'>
                <p ref={errRef} className={errMsg ? "register-errmsg" : "register-offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>
                            Username:
                            {/* <span className={validName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !user ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span> */}
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
                            {/* <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span> */}
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
        </div>
    )
}