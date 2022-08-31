import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "./styles/Post.css"
import "./styles/Posts.css"

export const Post = () => {
    const {id} = useParams()
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    const [showDeleteWindow, setShowDeleteWindow] = useState(false)
    const [animateDeleteWindow, setAnimateDeleteWindow] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            setLoading(true)
            const postFromAPI = await fetch(`http://localhost:5000/posts/?id=${id}`)
                .then(respsonse => {
                    if (respsonse.ok)
                        return respsonse.json()
                    throw respsonse
                })
                .catch((err) => {
                    console.log(err)
                })
            setPost(postFromAPI[0])
            setLoading(false)
        }
        getPost()
    }, [])

    const showHideDeleteWindow = (showHide) => {
        if(showHide){
            setShowDeleteWindow(true)
            setTimeout(()=>{
                setAnimateDeleteWindow(true)
            }, 1)
        }
        else{
            setAnimateDeleteWindow(false)
            setTimeout(()=>{
                setShowDeleteWindow(false)
            }, 300)
        }
    }

    if (loading) {
        return (
            <div className='posts-container'>
                <h1>Loading posts...</h1>
            </div>
        )
    }
    return(
        <section className='post-container'>
            <div className='post post-post'>
                <div className="post-head">
                    <div className='post-title'>
                        <h2>{post.title}</h2>
                        <p>Date: {post.date}</p>
                    </div>
                    <p className='post-desc'>{post.desc}</p>
                    {post.user !==undefined ? <p className='post-desc'>Posted by: {post.user}</p> : <></>}
                </div>
                <p className='post-content'>{post.content}</p>
                <div className="post-options">
                    <Link to={`/posts`}>
                        <button type="button">Back to Posts</button>
                    </Link>
                    <span>
                        <button type="button" onClick={()=>showHideDeleteWindow(true)}>Delete post</button>
                        <button type="button">Edit post</button>
                    </span>
                </div>
            </div>
            {showDeleteWindow && 
                <div className={`delete-window ${animateDeleteWindow ? "show-delete-window" : ""}`}>
                    <div className="delete-window-content">
                        <h2>Are you sure you want to delete post "{post.title}?"</h2>
                        <span className="delete-window-buttons">
                            <button>Yes</button>
                            <button onClick={()=>showHideDeleteWindow(false)}>Cancel</button>
                        </span>
                    </div>
                </div>
            }
        </section>
    )
}