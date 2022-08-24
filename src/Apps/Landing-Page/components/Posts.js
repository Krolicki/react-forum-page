import { useEffect, useState } from 'react'
import './styles/Posts.css'

export const Posts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(10)

    useEffect(()=>{
        const getPosts = async () => {
            setLoading(true)
            const postsList = await fetch("http://localhost:5000/posts")
            .then(respsonse =>{
                if(respsonse.ok)
                    return respsonse.json()
                throw respsonse
            })
            .catch((err)=>{
                console.log(err)
            })
            setPosts(postsList)
            setLoading(false)
        }
        getPosts()
    }, [])

    if(loading){
        return(
            <div className='posts-container'>
                <h1>Loading posts...</h1>
            </div>
        )
    }

    return (
        <div className='posts-container'>
            <section className='posts'>
                {posts.map(post => {
                    return(
                    <div className='post' key={post.id}>
                        <div className='post-head'>
                            <h2>{post.title}</h2>
                            <p>Date: {post.date}</p>
                        </div>
                        <p className='post-desc'>{post.desc}</p>
                        <button>Show post</button>
                    </div>
                    )
                })}
            </section>
        </div>
    )
}