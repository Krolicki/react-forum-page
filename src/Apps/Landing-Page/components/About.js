import './About.css'
import image from '../assets/3.jpg'

export const About = () =>{
    return (
        <div className='container'>
            <p>about</p>
            <img src={image} alt="image" className="aboutImg"/>
        </div>
    )
}