import './Navbar.css'

export const Navbar = ({navbarItems}) => {
    return(
        <nav>
            <span className="logo">LandingPage</span>
            <ul>
                {navbarItems.map((item) => {
                        return(
                            <li className='navbar-item' key={item.title}>
                                <a href={item.url} className='navbar-link'>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}