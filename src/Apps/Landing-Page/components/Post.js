import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "./styles/Post.css"
import "./styles/Posts.css"

export const Post = () => {
    const {id} = useParams()
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)

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
                <div className='post-head'>
                    <h2>{post.title}</h2>
                    <p>Date: {post.date}</p>
                </div>
                <p className='post-desc'>{post.desc}</p>
                <Link to={`/posts`}>
                    <button type="button">Go to Posts</button>
                </Link>
            </div>
        </section>
    )
}