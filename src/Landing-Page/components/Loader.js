import './styles/Posts.css'
import './styles/loader.css'

export const Loader = ({title}) => {
    return(
        <div className='posts-wraper' id="posts-top">
            <div className='posts-loading'>
                <h1>{title}</h1>
                <span className="loader" aria-live="assertive"></span>
            </div>
        </div>
    )
}