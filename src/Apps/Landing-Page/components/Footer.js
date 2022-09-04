import './styles/Footer.css'
import { AiOutlinePhone} from "react-icons/ai"
import { GoMail} from "react-icons/go"
import { Link } from 'react-router-dom'

export const Footer = () =>{
    return(
        <footer>
            <div>
                <Link to="/" className="footer-logo">
                    LandingPage
                </Link>  
            </div>
            <span className='footer-line'></span>
            <div className='footer-content'>
                <div className='footer-contact'>
                    <span>
                        <AiOutlinePhone size={120} className="footer-icon" />
                        +1234231543
                    </span>
                    <span>
                        <GoMail size={120}  className="footer-icon" />
                        contact@landing-page.com
                    </span>
                </div>
                <div className='footer-newsletter'>

                </div>
            </div>
        </footer>
    )
}