import { useRef, useState } from 'react'
import './Navbar.css'
import {FiX, FiMenu} from "react-icons/fi"
import {Link, useLocation} from 'react-router-dom'
import useAuth from '../hooks/useAuth'


export const Navbar = ({navbarItems}) => {
    const[menuClick, setMenuClick] = useState(false)
    const[showUserMenu, setShowUserMenu] = useState(false)
    const {auth, setAuth} = useAuth()

    const userMenu =useRef()

    const toggleMenuClick = () => {
        setMenuClick(!menuClick)
    }
    const location = useLocation()
    return(
        <nav onMouseLeave={()=>{setShowUserMenu(false)}} >
            <span className="logo">LandingPage</span>
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
                        <li className='navbar-item'>
                            <Link to='/login' className='navbar-link'>
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
                    <p onClick={ ()=> {
                        setAuth({})
                        setShowUserMenu(false) 
                    }}> 
                        Logout
                    </p>
            </span>
        </nav>
    )
}