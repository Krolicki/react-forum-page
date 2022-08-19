import { useState } from 'react'
import './Navbar.css'
import {FiX, FiMenu} from "react-icons/fi"
import {Link, useLocation} from 'react-router-dom'
import useAuth from '../hooks/useAuth'


export const Navbar = ({navbarItems}) => {
    const[menuClick, setMenuClick] = useState(false)
    const {auth, setAuth} = useAuth()

    const toggleMenuClick = () => {
        setMenuClick(!menuClick)
    }
    const location = useLocation()
    return(
        <nav>
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
                                <Link to={item.url} className='navbar-link'>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })
                }
            {auth.user !== undefined && 
                <li className='navbar-item'>
                    <Link to='/' className='navbar-link' onClick={()=>{
                        setAuth({})
                    }}>
                        {auth.user}
                    </Link>
                </li>}
            </ul>
        </nav>
    )
}