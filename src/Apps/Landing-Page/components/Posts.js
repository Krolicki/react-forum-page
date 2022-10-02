import { useEffect, useState } from 'react'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import { Loader } from './Loader'
import { Pagination } from './Pagination'
import './styles/Posts.css'

export const Posts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const query = useLocation()
    const uid = useOutletContext()

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true)

            const postsFromApi = await fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=${uid}`)
                .then(respsonse => {
                    if (respsonse.ok)
                        return respsonse.json()
                    throw respsonse
                })
                .catch((err) => {
                    console.log(err)
                })
            const postsList = postsFromApi.filter(element => {
                return element !== null
            })
            getMostViewed(postsList)
            setPosts(postsList.reverse())
            setLoading(false) 
        }
        getPosts()
        if(query.state?.page !== undefined && query.state?.page !== null)
            setCurentPage(query.state?.page)

        window.scrollTo(0, 0)
    }, [])

    const indexLastPost = currentPage * postsPerPage
    const indexFirstPost = indexLastPost - postsPerPage
    const currentPosts = posts.slice(indexFirstPost, indexLastPost)

    const paginate = (num) => setCurentPage(num)

    const [mostViewed, setMostViewed] = useState([])
 
    const getMostViewed = (list) => {
        let first, second, third
        let firstID, secondID, thirdID
        first = second = third = Number.MIN_VALUE

        list.forEach(post => {
            if(post?.views !==undefined){
                if(post.views > first){
                    third = second;
                    second = first;
                    first = post.views;
                    thirdID = secondID;
                    secondID = firstID;
                    firstID = post;
                }
                else if (post.views > second)
                {
                    third = second;
                    second = post.views;
                    thirdID = secondID;
                    secondID = post;
                }
                else if (post.views > third){
                    third = post.views;
                    thirdID = post;
                }
            }
        })
        setMostViewed([firstID, secondID, thirdID])
    }

    if (loading) {
        return <Loader title={"Loading posts..."} />
    }

    return (
        <div className='posts-wraper' id="posts-top">
            <section className='posts-container'>
                <Pagination
                    postsPerPage={postsPerPage} 
                    totalPosts={posts.length} 
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <Link to="/newpost" className='new-post-button'><button>New Post</button></Link>
                <section className='posts'>
                    {currentPosts.map(post => {
                        if(post === null)
                            return <></>
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
                                <Link to={`/post/${post.id}`} state={currentPage}>
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
            </section>
            <section className='posts-best'>
                    <h1>Most viewed posts</h1>
                    {mostViewed.map(post => {
                        return(
                            <div className='post post-best' key={post.id}>
                                <div className='post-head best-head'>
                                    <div className='best-title'>
                                        <h2>{post.title}</h2>
                                        {post.edit?
                                            <p>Edited: {post.edit.slice(0,10)}</p>
                                        :
                                            <p>Posted: {post.date.slice(0,10)}</p>
                                        }   
                                    </div>
                                </div>
                                <p className='post-desc'>{post.desc}</p>
                                <div className='post-info'>
                                    {post.user !==undefined ? <p>Posted by: {post.user}</p> : <></>}
                                    <p>Views: {post.views !==undefined ? post.views : "0"}</p>
                                </div>
                                <Link to={`/post/${post.id}`} state={currentPage}>
                                    <button type='button'>Show post</button>
                                </Link>
                            </div>
                        )
                    })}
            </section>
        </div>
    )
}