import './styles/Footer.css'
import { AiOutlinePhone} from "react-icons/ai"
import { GoMail, GoMarkGithub} from "react-icons/go"
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
                        <h2>Call center</h2>
                        <p>+1234231543</p>
                    </span>
                    <span>
                        <GoMail size={120}  className="footer-icon" />
                        <h2>Mail</h2>
                        <p>jakub.krolicki.k@gmail.com</p>
                    </span>
                    <span>
                        <a href="https://github.com/Krolicki" target="_blank">
                            <GoMarkGithub size={120}  className="footer-icon" />
                            <h2>GitHub</h2>
                            <p>github.com/Krolicki</p>
                        </a>
                    </span>
                </div>
                <div className='footer-newsletter'>
                    <p>SUBSCRIBE TO THE NEWSLETTER:</p>
                    <span>
                        <input placeholder='Enter your e-mail'/>
                        <button>SUBSCRIBE</button>
                    </span>
                </div>
            </div>
            <span className='footer-line'></span>
            <p>©2022 LandingPage Jakub Królicki</p>
        </footer>
    )
}