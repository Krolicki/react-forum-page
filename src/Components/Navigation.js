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
            {showMenu && 
                <div className='menu-bar'>
                    <span>Option 1</span>
                    <span>Option 2</span>
                    <span>Option 3</span>
                    <span>Option 4</span>
                </div>
            }
        </nav>
    )
}