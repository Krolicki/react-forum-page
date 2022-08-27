import { useEffect, useState } from 'react'
import { Pagination } from './Pagination'
import './styles/Posts.css'

export const Posts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurentPage] = useState(1)
    const [postsPerPage] = useState(5)

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true)
            const postsList = await fetch("http://localhost:5000/posts")
                .then(respsonse => {
                    if (respsonse.ok)
                        return respsonse.json()
                    throw respsonse
                })
                .catch((err) => {
                    console.log(err)
                })
            setPosts(postsList.reverse())
            setLoading(false)
        }
        getPosts()
    }, [])

    const indexLastPost = currentPage * postsPerPage
    const indexFirstPost = indexLastPost - postsPerPage
    const currentPosts = posts.slice(indexFirstPost, indexLastPost)

    if (loading) {
        return (
            <div className='posts-container'>
                <h1>Loading posts...</h1>
            </div>
        )
    }

    const paginate = (num) => setCurentPage(num)

    return (
        <div className='posts-container' id="posts-top">
            <section className='posts'>
                {currentPosts.map(post => {
                    return (
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
            <Pagination
                postsPerPage={postsPerPage} 
                totalPosts={posts.length} 
                paginate={paginate} 
            />
        </div>
    )
}