import { useEffect, useRef, useState } from "react"
import "./styles/NewPost.css"
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

export const NewPost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [sending, setSending] = useState(false)
    const [posted, setPosted] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const titleRef = useRef()
    const errRef = useRef()

    const {auth} = useAuth()

    useEffect(()=>{
        titleRef.current.focus()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        setErrMsg('')
        let date = new Date()
        let postDate = `${('0'+date.getDate()).slice(-2)}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getFullYear()} ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`
        await fetch(`http://localhost:5000/posts`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({title, desc: content, date: postDate, user: auth.user})
        })
        .then((response) => {
            if(response.ok){
                setPosted(true)
                return response
            }
            throw response
        })
        .catch((err)=>{
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

    return(
        <div className="newpost-container">
            <section className='newpost-post'>
            {posted ? 
            <>
                <h1>Successfully added post</h1>
                <h3>Title: {title}</h3>
                <Link to="/posts" className="newpost-link">Go to Posts</Link>
            </>
            :
            <>
                <p ref={errRef} className={errMsg ? "newpost-errmsg" : "newpost-offscreen"} aria-live="assertive">{errMsg}</p>
                <div className={sending ? "loader-container" : "newpost-offscreen"}><span className={sending ? "loader" : "post-offscreen"} aria-live="assertive"></span></div>
                <h1>Create a new post</h1>
                <form className="newpost-form" onSubmit={handleSubmit}>
                    <label htmlFor='title'>
                            Title:
                    </label>
                    <input 
                        type="text"
                        id="title"
                        ref={titleRef}
                        autoComplete="off"
                        onChange={(e) => {setTitle(e.target.value)}}
                        value={title}
                        required
                    />
                    <label htmlFor='content'>
                        Content:
                    </label>
                    <textarea 
                        type="text"
                        id="content"
                        autoComplete="off"
                        onChange={(e) => {setContent(e.target.value)}}
                        value={content}
                        required
                    />
                    <button>Submit</button>
                </form>
            </>
            }       
            </section>
        </div>
    )
}