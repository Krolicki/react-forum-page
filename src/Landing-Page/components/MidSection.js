import './styles/MidSection.css'
import {GiMountaintop} from "react-icons/gi"
import { BiTrip } from "react-icons/bi"
import { MdOutlineCardTravel} from "react-icons/md"

export const MidSection = () => {
    return(
        <div className='mid-section-container'>
            <div className='mid-section-card'>
                <GiMountaintop size={150} className="mid-card-icon"/>
                <h2>Title 1</h2>
                <p>Non eu ex fugiat cillum culpa incididunt Lorem ipsum tempor non dolor quis.</p>
            </div>
            <div className='mid-section-card'>
                <BiTrip size={150} className="mid-card-icon"/>
                <h2>Title 2</h2>
                <p>Esse tempor laboris elit do minim.</p>
            </div>
            <div className='mid-section-card'>
                <MdOutlineCardTravel size={150} className="mid-card-icon"/>
                <h2>Title 3</h2>
                <p>Et officia cupidatat duis qui sunt officia in cillum consequat consectetur consectetur velit.</p>
            </div>
        </div>
    )
}