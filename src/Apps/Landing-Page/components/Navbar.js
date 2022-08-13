import { useState } from 'react'
import './Navbar.css'
import {FiX, FiMenu} from "react-icons/fi"
import {Link} from 'react-router-dom'


export const Navbar = ({navbarItems}) => {
    const[menuClick, setMenuClick] = useState(false)

    const toggleMenuClick = () => {
        setMenuClick(!menuClick)
    }

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
                            <li className='navbar-item' key={item.title}>
                                <Link to={item.url} className='navbar-link'>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}