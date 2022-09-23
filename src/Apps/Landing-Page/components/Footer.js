import './styles/Footer.css'
import { AiOutlinePhone} from "react-icons/ai"
import { GoMail, GoMarkGithub} from "react-icons/go"
import { Link } from 'react-router-dom'
import { useState } from 'react'

const EMAIL_REGEX =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const Footer = () =>{
    const [email, setEmail] = useState('')
    const [signed, setSigned] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const handleChange = event => {
        if (!EMAIL_REGEX.test(event.target.value)) {
            setInvalidEmail(true)
        } 
        else {
            setInvalidEmail(false);
        }
        setEmail(event.target.value);
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrMsg('')
        const lastPost = await fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/newsletter.json?orderBy=%22id%22&limitToLast=1`)
        .then(respsonse => {
            if (respsonse.ok)
                return respsonse.json()
            throw respsonse
        })
        .catch((err) => {
            console.log(err)
            setErrMsg("Sending failed")
        })
        let newSub = -1
        let date = new Date()
        let subDate = `${('0'+date.getDate()).slice(-2)}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`

        if(Object.values(lastPost)[0] !== undefined){
            newSub = (parseInt(Object.values(lastPost)[0].id)+1)
        }
 
        await fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/newsletter/${newSub}.json`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        id: newSub,
                        date: subDate
                    })
        })
        .then((response) => {
            if(response.ok){
                setSigned(true)
                return response
            }
            throw response
        })
        .catch((err)=>{
            console.log(err)
            if(!err?.response){
                setErrMsg("No server response")
            }
            else{
                setErrMsg("Sending failed")
            }
        })
    }


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
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder='Enter your e-mail' 
                            onChange={handleChange}
                            value={email || ""}
                            required
                            disabled={signed ? true : false}
                            className={`${invalidEmail ? "invalid-email" : ""}`}
                        />
                        <button disabled={invalidEmail || signed? true : false}>{signed ? "THANK YOU" : "SUBSCRIBE"}</button>
                    </form>
                </div>
            </div>
            <span className='footer-line'></span>
            <p>©2022 LandingPage Jakub Królicki</p>
        </footer>
    )
}