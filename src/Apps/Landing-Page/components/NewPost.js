import { useEffect, useRef, useState } from "react"
import "./styles/NewPost.css"

export const NewPost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [sending, setSending] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const titleRef = useRef()
    const errRef = useRef()

    useEffect(()=>{
        titleRef.current.focus()
    },[])

    return(
        <div className="newpost-container">
            <section className='newpost-post'>
            <p ref={errRef} className={errMsg ? "newpost-errmsg" : "newpost-offscreen"} aria-live="assertive">{errMsg}</p>
                <div className={sending ? "loader-container" : "newpost-offscreen"}><span className={sending ? "loader" : "post-offscreen"} aria-live="assertive"></span></div>
                <h1>Create a new post</h1>
                <form className="newpost-form">
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
            </section>
        </div>
    )
}