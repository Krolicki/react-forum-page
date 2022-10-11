import { Hero } from "./Hero"
import { Slider } from "./Slider"
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import image3 from '../assets/3.jpg'
import { MidSection } from "./MidSection"
import { useEffect } from "react"

export const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return(
        <>
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
            <MidSection />
        </>
    )
}