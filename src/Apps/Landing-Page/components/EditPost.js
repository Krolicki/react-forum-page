import './styles/EditPost.css'
import './styles/NewPost.css'
import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useGetPost } from '../hooks/useGetPost'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { Loader } from './Loader'
import useAuth from "../hooks/useAuth"

export const EditPost = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const [edited, setEdited] = useState(false)
    const [sending, setSending] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const uid = useOutletContext()
    const {auth} = useAuth()

    const {post, loading, postNotFound} = useGetPost(id)

    const errRef = useRef()
    const titleRef = useRef()

    useEffect(()=>{
        if(auth.user !== post.user)
            navigate("/posts", {replace: true})
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

        if(auth.user === post.user){
            let date = new Date()
            let edit = `${('0'+date.getDate()).slice(-2)}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getFullYear()} ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`
            await fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json?auth=${uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title, 
                    desc,
                    content,
                    edit
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
        else{
            setErrMsg("Unauthorized")
            setSending(false)
        }
    }

    if (loading) {
        return <Loader title={"Loading edit page..."} />
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
        <>
            {edited ? 
            <section className='post-container'>
                <div className="delete-window show-delete-window">
                    <div className="delete-window-content">
                        <h2>Successfully edited post "{title}"</h2>
                        <span className='edited-buttons-wraper'>
                            <Link to={`/posts`} className="delete-window-buttons">
                                <button type="button">Back to Posts</button>
                            </Link>
                            <Link to={`/post/${post.id}`} className="delete-window-buttons">
                                <button type="button">Back to this Post</button>
                            </Link>
                        </span>
                    </div>
                </div>
            </section>
            :
            <section className='post-container'>
                <div className='post post-post'>
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
                                value={desc || 'Loading description...'} 
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
                            value={content || ''} 
                            autoComplete="off"
                            required
                        />
                        <div className="post-options">
                            <span>
                                <Link to={`/posts`}>
                                    <button type="button">Back to all Posts</button>
                                </Link>
                                <Link to={`/post/${post.id}`}>
                                    <button type="button">Back to this Post</button>
                                </Link>
                            </span>
                            <span>
                                <button type="submit">Save changes</button>
                            </span>
                        </div>
                    </form>
                </div>
            </section>
            }
        </>
    )
}