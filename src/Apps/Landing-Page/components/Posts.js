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
                <div className='post'>
                    <div className='post-head'>
                        <h2>Post 1</h2>
                        <p>Date: 23-08-2022</p>
                    </div>
                    <p className='post-desc'>Eu proident sit sit pariatur laborum tempor consectetur officia aliqua.</p>
                    <button>Show post</button>
                </div>
                <div className='post'>
                    <div className='post-head'>
                        <h2>Post 2</h2>
                        <p>Date: 23-08-2022</p>
                    </div>
                    <p className='post-desc'>Nulla magna eiusmod sint deserunt non eu consequat qui eiusmod do irure esse non id.</p>
                    <button>Show post</button>
                </div>
            </section>
        </div>
    )
}