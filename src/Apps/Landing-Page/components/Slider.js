import { useInView } from 'react-intersection-observer'
import './styles/Slider.css'

export const Slider = ({imgSrc, title, subtitle, flip}) => {

    const {ref, inView, entry} = useInView({
        threshold: 0.1
    })

    const renderContent = () => {
        if(!flip || window.innerWidth < 920){
            return(
                <>
                    <img src={imgSrc} alt="image" className='slider-img' />
                    <div className='slider-content'>
                        <h2 className='slider-title'>{title}</h2>
                        <p>{subtitle}</p>
                    </div>
                </>
            )
        }
        return(
            <>
                <div className='slider-content'>
                    <h2 className='slider-title'>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                <img src={imgSrc} alt="image" className='slider-img' />
            </>
        )

    }

    return(
        <div className={`slider ${inView ? 'show-slider' : ''}`} ref={ref} inView>
            {renderContent()}
        </div>
    )
}