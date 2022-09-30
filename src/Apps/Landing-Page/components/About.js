import './styles/About.css'
import image from '../assets/3.jpg'
import { useEffect } from 'react'

export const About = () =>{
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className='about-container'>
            <div className='about-head'>
                <div className='about-content'>
                    <h2>About us</h2>
                    <p>Ut est qui ipsum exercitation ullamco amet velit amet dolor culpa eu.</p>
                    <p>Nulla veniam labore exercitation aliquip ullamco laboris ex minim. Aliquip esse mollit deserunt dolor ad dolor adipisicing fugiat fugiat duis.</p>
                    <p>Voluptate et ut velit culpa non.</p>
                </div>
                <img src={image} alt="image" className="aboutImg"/>
            </div>
        </div>
    )
}