import './styles/Register.css'
import './styles/ChangePassword.css'
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useRef , useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { base_auth }  from '../firebase/base'
import {updatePassword, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth"

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const ChangePassword = () => {
    const oldPassRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');

    const [oldPass, setOldPass] = useState('');
    const [invalidOldPass, setInvalidOldPass] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const {auth, setAuth} = useAuth()

    useEffect(()=>{
        if (auth.user !== undefined){
            setUser(auth.user)
        }
        oldPassRef.current.focus()
        window.scrollTo(0, 0)
    },[])


    useEffect(()=>{
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    },[pwd, matchPwd])

    useEffect(()=>{
        setErrMsg('')
    },[oldPass, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const vpass = PWD_REGEX.test(pwd)

        if(!vpass){
            setErrMsg("Invalid Entry")
            return
        }

        if(pwd === oldPass){
            setErrMsg("New password cannot be the same as old one!")
            return
        }

        setLoading(true)

        let credentials = EmailAuthProvider.credential(
            base_auth.currentUser.email,
            oldPass
        )

        let invOldPass = true

        await reauthenticateWithCredential(
            base_auth.currentUser,
            credentials   
        )
        .then(() => {
            setInvalidOldPass(false)
            invOldPass = false
        })
        .catch(err => {
            if(!err?.code){
                setErrMsg("No server response")
            }
            else{
                setErrMsg(err.code.slice(5,err.code.length).replace(/-/g," "))
            } 
            setInvalidOldPass(true)
            invOldPass= true
            return
        })

        if(!invOldPass){
            updatePassword(base_auth.currentUser, pwd)
            .then(() => {
                setSuccess(true)
            })
            .catch(err => {
                if(!err?.code){
                    setErrMsg("No server response")
                }
                else{
                    setErrMsg(err.code.slice(5,err.code.length).replace(/-/g," "))
                }
            })
        }

        setLoading(false)
    }
    return(
        <div className='changepass-container'>
            {success ? (
                <div className='register-form-wrapper'>
                    <h1>Success!</h1>
                    <p>Password {user} was successfully changed</p>
                    <span className='register-link' onClick={()=>{ setAuth({}) }}>
                        <Link to="/login">Sing in</Link>
                    </span>
                </div>
            ) : (
                <div className='register-form-wrapper'>
                <div className={loading ? "loader-container" : "register-offscreen"}><span className={loading ? "loader" : "register-offscreen"} aria-live="assertive"></span></div>
                    <p ref={errRef} className={errMsg ? "register-errmsg" : "register-offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Change password</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='oldpass'>
                            Old password:
                            <span className={invalidOldPass ? "invalid" : "hide"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input 
                            type="password"
                            id="oldpass"
                            ref={oldPassRef}
                            onChange={(e) => {setOldPass(e.target.value)}}
                            required
                            aria-invalid={invalidOldPass ? "false" : "true"}
                            aria-describedby = "uidnote"
                        />

                        <label htmlFor='password'>
                            New password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input 
                            type="password"
                            id="password"
                            onChange={(e) => {setPwd(e.target.value)}}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby = "pwdnote"
                            onFocus={()=> setPwdFocus(true)}
                            onBlur={()=>setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "register-offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Password must be 8 to 24 characters long<br />
                            Must include uppercase and lowercase letters, a number and a special character.
                        </p>

                        <label htmlFor='confirm_pwd'>
                            Confirm new password:
                            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input 
                            type="password"
                            id="confirm-pwd"
                            onChange={(e) => {setMatchPwd(e.target.value)}}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby = "confirmnote"
                            onFocus={()=> setMatchFocus(true)}
                            onBlur={()=>setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && matchPwd && !validMatch ? "instructions" : "register-offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Password are not the same
                        </p>

                        <button disabled={!validMatch || !validPwd ? true : false}>
                            Save changes
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}