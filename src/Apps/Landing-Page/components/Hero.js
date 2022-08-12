import './Hero.css'

export const Hero = ({imgSrc}) => {
    return (
        <div className='hero'>
            <img src={imgSrc} alt="Hero Image" className="hero-image"/>
            <h1 className="hero-title">Title of the page</h1>
        </div>
    )
}