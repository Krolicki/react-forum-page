import './styles/EditPost.css'
import './styles/NewPost.css'
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useGetPost } from '../hooks/useGetPost'

export const EditPost = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const [edited, setEdited] = useState(false)
    const [sending, setSending] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const {post, loading} = useGetPost(31)

    const errRef = useRef()
    const titleRef = useRef()

    useEffect(()=>{
        titleRef.current.focus()
    },[])

    useEffect(()=>{
        setTitle(post.title)
        setDesc(post.desc)
        setContent(post.content)
    },[post])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        setErrMsg('')
        await fetch(`http://localhost:5000/posts/${post.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                desc,
                content
            })
        })
        .then(respsonse => {
            if(respsonse.ok){
                setEdited(true)
                return respsonse
            }
            throw respsonse
        })
        .catch(err => {
            console.log(err)
            if(!err?.response){
                setErrMsg("No server response")
            }
            else{
                setErrMsg("Sending post failed")
            }
        })
        .finally(()=>{
            setSending(false)
        })
    }

    if (loading) {
        return (
            <div className='posts-container'>
                <h1>Loading post...</h1>
            </div>
        )
    }

    return(
        <section className='post-container'>
            <div className='post post-post'>
                {edited ? 
                <>
                    <h1>Successfully edited post</h1>
                    <h3>Title: {title}</h3>
                    <Link to="/posts" className="newpost-link">Go to Posts</Link>
                </>
                :
                <>
                    <p ref={errRef} className={errMsg ? "newpost-errmsg" : "newpost-offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className={sending ? "loader-container" : "newpost-offscreen"}><span className={sending ? "loader" : "post-offscreen"} aria-live="assertive"></span></div>
                    <form className='edit-post-form' onSubmit={handleSubmit}>
                        <div className="post-head">
                            <label htmlFor='title'>
                                Title:
                            </label>
                            <input 
                                id="title"
                                onChange={(e) => {setTitle(e.target.value)}} 
                                value={title || 'Loading title...'}
                                autoComplete="off"
                                ref={titleRef}
                                required
                            />
                            <label htmlFor='description'>
                                Short description:
                            </label>
                            <input 
                                id="description" 
                                onChange={(e) => {setDesc(e.target.value)}}
                                value={desc || 'Loading description'} 
                                autoComplete="off"
                                required
                            />
                        </div>
                        <label htmlFor='content'>
                            Content:
                        </label>
                        <textarea 
                            id="content" 
                            className='post-content' 
                            onChange={(e) => {setContent(e.target.value)}}
                            value={content || 'Loading content'} 
                            autoComplete="off"
                            required
                        />
                        <div className="post-options">
                            <Link to={`/posts`}>
                                <button type="button">Back to Posts</button>
                            </Link>
                            <span>
                                <button type="submit">Save changes</button>
                            </span>
                        </div>
                    </form>
                </>
                }
            </div>
        </section>
    )
}