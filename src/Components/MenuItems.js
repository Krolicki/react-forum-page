import { Link } from 'react-router-dom';

export const MenuItems = (props) => {
    return(
        <div>
            <ul>
                <li>
                    <Link to="/" className='link' onClick={props.closeMenu}>Home</Link>
                </li>
                <li>
                    <Link to="/about" className='link' onClick={props.closeMenu}>About</Link>
                </li>
            </ul>
        </div>
    )
}