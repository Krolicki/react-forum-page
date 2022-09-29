import { useEffect, useRef, useState } from "react"
import "./styles/NewPost.css"
import { Link, useOutletContext } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

export const NewPost = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')

    const [sending, setSending] = useState(false)
    const [posted, setPosted] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const [newID, setNewID] = useState(0)

    const titleRef = useRef()
    const errRef = useRef()

    const {auth} = useAuth()

    const uid = useOutletContext()

    useEffect(()=>{
        titleRef.current.focus()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        setErrMsg('')
        const lastPost = await fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/posts.json?orderBy=%22id%22&limitToLast=1&auth=${uid}`)
        .then(respsonse => {
            if (respsonse.ok)
                return respsonse.json()
            throw respsonse
        })
        .catch((err) => {
            console.log(err)
            setErrMsg("Sending post failed")
        })
        let date = new Date()
        let postDate = `${('0'+date.getDate()).slice(-2)}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getFullYear()} ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`
        let newPostID = -1

        if(Object.values(lastPost)[0] !== undefined){
            newPostID = (parseInt(Object.values(lastPost)[0].id)+1)
        }
        if(newPostID !== -1)
            await fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/posts/${newPostID}.json?auth=${uid}`, {
                            method: 'PUT',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                title, 
                                desc,
                                content, 
                                date: postDate, 
                                user: auth.user,
                                views: 0,
                                id: newPostID
                            })
                })
                .then((response) => {
                    if(response.ok){
                        return response.json()
                    }
                    throw response
                })
                .then((response)=>{
                    setNewID(response.id)
                    setPosted(true)
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
            else{
                setErrMsg("Sending post failed")
            }
                setSending(false)
    }

    return(
        <div className="newpost-container">
            <section className='newpost-post'>
            {posted ? 
            <>
                <h1>Successfully added post</h1>
                <h3>Title: {title}</h3>
                <Link to="/posts" className="newpost-link">Go to Posts</Link>
                <Link to={`/post/${newID}`} className="newpost-link">Open this Post</Link>
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
                    <label htmlFor='desc'>
                            Short description:
                    </label>
                    <input 
                        type="text"
                        id="desc"
                        autoComplete="off"
                        onChange={(e) => {setDesc(e.target.value)}}
                        value={desc}
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