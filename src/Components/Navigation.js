import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'

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
                <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                    <li>Option 4</li>
                </ul>
            </div>
        </nav>
    )
}