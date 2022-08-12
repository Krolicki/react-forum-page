import './landingPage.css'
import image1 from './assets/1.jpg'
import image2 from './assets/2.jpg'
import image3 from './assets/3.jpg'
import { Hero } from './components/Hero'
import { Slider } from './components/Slider'
import { Navbar } from './components/Navbar'

const navbarItems = [
    {url: "#", title:"Home"},
    {url: "#", title:"Contact"},
    {url: "#", title:"About"}
]


export const LandingPage = () => {
    return (
        <div>
            <Navbar navbarItems={navbarItems}/>
            <Hero imgSrc={image3} />
            <Slider
                imgSrc={image1}
                title={"Text to slider 1"} 
                subtitle={"Nostrud id et non sint duis velit veniam et deserunt."}
            />
            <Slider 
                imgSrc={image2} 
                title={"Text to slider 2"} 
                subtitle={"Commodo et esse mollit aute esse cupidatat anim est sunt irure in."}
                flip
            />
        </div>
    )
}