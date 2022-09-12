import { useRef, useState } from 'react'
import './styles/Navbar.css'
import {FiX, FiMenu, FiArrowLeft} from "react-icons/fi"
import {Link, useLocation, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useCookies } from 'react-cookie'


export const Navbar = ({navbarItems}) => {
    const[menuClick, setMenuClick] = useState(false)
    const[showUserMenu, setShowUserMenu] = useState(false)
    const {auth, setAuth} = useAuth()
    const [,, removeCookie] = useCookies(['user'])

    const userMenu =useRef()

    const toggleMenuClick = () => {
        setMenuClick(!menuClick)
    }
    const location = useLocation()
    const navigate = useNavigate();
    return(
        <nav onMouseLeave={()=>{setShowUserMenu(false)}} >
            <Link to="/" className="logo">
                LandingPage
            </Link>  
            {menuClick ? (
                <FiX size={25} className="nav-icon" onClick={toggleMenuClick} />
            ) : (
                <FiMenu size={25} className="nav-icon" onClick={toggleMenuClick} />
            )}
            <ul className={menuClick ? "show-menu" :  ""}>
                {navbarItems.map((item) => {
                        return(
                            <li className={`navbar-item ${item.url===location.pathname ? "activeMenu" : ""}`} key={item.title}>
                                <Link to={item.url} className='navbar-link' onClick={toggleMenuClick}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })
                }
                {auth.user !== undefined 
                    ?
                        <>
                            <li className='navbar-item'>
                                <a className='navbar-link user-link' onMouseEnter={()=>{setShowUserMenu(true); userMenu.current.focus()}}>
                                    {auth.user}
                                </a>
                            </li>
                        </>
                    :
                        <li className={`navbar-item ${location.pathname === '/login' ? "activeMenu" : ""}`}>
                            <Link to='/login' className='navbar-link' onClick={toggleMenuClick}>
                                Login
                            </Link>
                        </li>
                }
            </ul>
            <span 
                ref={userMenu}
                className={`user-menu ${showUserMenu ? "show-user-menu" : ""}`}
                onMouseLeave={()=>{setShowUserMenu(false)  }}   
            >
                    <FiArrowLeft size={25} className="close-user-menu" onClick={()=>setShowUserMenu(false)} />
                    <p onClick={ ()=> {
                        navigate("/changepassword")
                    }}> 
                        Change password
                    </p>
                    <p onClick={ ()=> {
                        setAuth({})
                        setShowUserMenu(false) 
                        removeCookie("user", { path:"/" })
                    }}> 
                        Logout
                    </p>
            </span>
        </nav>
    )
}