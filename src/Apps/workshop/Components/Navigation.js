import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import { MenuItems } from './MenuItems';

export const Navigation = () => {
    
    const [showMenu, setShowMenu] = useState(false)

    return (
        <nav>
            <span className='nav-icon'>
                <FontAwesomeIcon 
                    icon={faBars} 
                    onClick={() => {setShowMenu(!showMenu)}}
                />   
            </span> 
            <div className={`menu-bar ${showMenu ? 'show-menu' : ''}`}>
                 <MenuItems closeMenu={() => setShowMenu(false)}/>
            </div>
        </nav>
    )
}