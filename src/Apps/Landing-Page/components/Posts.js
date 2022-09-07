import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
            <Pagination
                postsPerPage={postsPerPage} 
                totalPosts={posts.length} 
                paginate={paginate}
                currentPage={currentPage}
            />
            <Link to="/newpost" className='new-post-button'><button>New Post</button></Link>
            <section className='posts'>
                {currentPosts.map(post => {
                    return (
                        <div className='post' key={post.id}>
                            <div className='post-head'>
                                <div className='post-title'>
                                    <h2>{post.title}</h2>
                                    {post.edit?
                                        <p>Edited: {post.edit}</p>
                                    :
                                        <p>Posted: {post.date}</p>
                                    }   
                                </div>
                            </div>
                            <p className='post-desc'>{post.desc}</p>
                            <div className='post-info'>
                                {post.user !==undefined ? <p>Posted by: {post.user}</p> : <></>}
                                <p>Views: {post.views !==undefined ? post.views : "0"}</p>
                            </div>
                            <Link to={`/post/${post.id}`}>
                                <button type='button'>Show post</button>
                            </Link>
                        </div>
                    )
                })}
            </section>
            <Pagination
                postsPerPage={postsPerPage} 
                totalPosts={posts.length} 
                paginate={paginate} 
                currentPage={currentPage}
            />
        </div>
    )
}