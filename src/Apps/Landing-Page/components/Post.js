import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useGetPost } from "../hooks/useGetPost"
import "./styles/Post.css"
import "./styles/Posts.css"

export const Post = () => {
    const {id} = useParams()
    const [showDeleteWindow, setShowDeleteWindow] = useState(false)
    const [animateDeleteWindow, setAnimateDeleteWindow] = useState(false)
    const [postDeleted, setPostDeleted] = useState(false)

    const {post, loading, postNotFound} = useGetPost(id)

    const deletePost = async () => {
        await fetch(`http://localhost:5000/posts/${post.id}`, {
            method: 'DELETE',
        })
        .then(respsonse => {
            if(respsonse.ok){
                setPostDeleted(true)
                return respsonse
            }
            throw respsonse
        })
        .catch(err => {
            console.log(err)
        })
    }

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

    if (postNotFound) {
        return (
            <section className='post-container'>
                <div className="delete-window show-delete-window">
                    <div className="delete-window-content">
                        <h2>Post not found</h2>
                        <Link to={`/posts`} className="delete-window-buttons">
                            <button type="button">Back to Posts</button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }
    return(
        <section className='post-container'>
            <div className='post post-post'>
                <div className="post-head">
                    <div className='post-title'>
                        <h2>{post.title}</h2>
                        {post.edit?
                            <p>Edited: {post.edit}<br/>Posted: {post.date}</p>
                        :
                            <p>Posted: {post.date}</p>
                        }  
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
                        <Link to={`/editpost/${post.id}`}>
                            <button type="button">Edit post</button>
                        </Link>
                    </span>
                </div>
            </div>
            {showDeleteWindow && 
                <div className={`delete-window ${animateDeleteWindow ? "show-delete-window" : ""}`}>
                    <div className="delete-window-content">
                        {!postDeleted ?
                        <>
                            <h2>Are you sure you want to delete post "{post.title}"?</h2>
                            <span className="delete-window-buttons">
                                <button onClick={()=>deletePost()}>Yes</button>
                                <button onClick={()=>showHideDeleteWindow(false)}>Cancel</button>
                            </span>
                        </>
                        :
                        <> 
                            <h2>Post "{post.title}" has been deleted</h2>
                            <Link to={`/posts`} className="delete-window-buttons">
                                <button type="button">Back to Posts</button>
                            </Link>
                        </>
                        }
                    </div>
                </div>
            }
        </section>
    )
}