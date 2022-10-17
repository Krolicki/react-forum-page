import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import { Loader, Pagination } from '../components'
import './styles/Posts.css'
import {BsSearch} from "react-icons/bs"
import {FiX} from "react-icons/fi"

export const Posts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const query = useLocation()
    const uid = useOutletContext()
    const findRef = useRef()
    const [searchQuery, setSearchQuery] = useState("")
    const [searchCount, setSearchCount] = useState(null)
    const [serchPosts, setSearchPosts] = useState(null)

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
        if(query.state?.find !== undefined && query.state?.find !== null && query.state?.find !== ""){
            setSearchQuery(query.state?.find)
        }
        window.scrollTo(0, 0)
    }, [])

    const indexLastPost = currentPage * postsPerPage
    const indexFirstPost = indexLastPost - postsPerPage
    const currentPosts = serchPosts === null ? posts.slice(indexFirstPost, indexLastPost) : serchPosts.slice(indexFirstPost, indexLastPost)

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

    const findPost = () => {
        let tempPostsList = []
        let findQuery = findRef.current.value
        if(findQuery === ""){
            setSearchCount(null)
            setSearchPosts(null)
            return
        }
        posts.forEach(post =>{
            if(post.title.toLowerCase().includes(findQuery) || post.desc.toLowerCase().includes(findQuery)){
                tempPostsList.push(post)
            }
        })
        setSearchCount(tempPostsList.length)
        setCurentPage(1)
        setSearchPosts(tempPostsList)
    }

    if (loading) {
        return <Loader title={"Loading posts..."} />
    }

    return (
        <div className='posts-wraper' id="posts-top">
            <section className='posts-container'>
                <Pagination
                    postsPerPage={postsPerPage} 
                    totalPosts={serchPosts === null ? posts.length : serchPosts.length} 
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <div className='posts-above'>
                    <input type="text" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} className='posts-find' ref={findRef} onKeyDown={e => {if(e.key === 'Enter') findPost()}} placeholder='Find post...' />
                    <BsSearch size={25} className="posts-find-icon" onClick={findPost} />
                    {searchQuery !== "" ? <FiX size={35} className="posts-find-icon" onClick={()=>{setSearchQuery(""); findRef.current.value = ""; findPost()}} /> : <></>}
                    <Link to="/newpost" className='new-post-button'><button>New Post</button></Link>
                </div>
                {searchCount !== null ? <p className='search-count'>{searchCount} results</p> : <></>}
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
                                    {post.user !==undefined ? <p>Posted by: <Link to={`/profile/${post.user}`}>{post.user}</Link></p> : <></>}
                                    <p>Views: {post.views !==undefined ? post.views : "0"}</p>
                                </div>
                                <Link to={`/post/${post.id}`} state={{page: currentPage, find: searchQuery}} >
                                    <button type='button'>Show post</button>
                                </Link>
                            </div>
                        )
                    })}
                </section>
                <Pagination
                    postsPerPage={postsPerPage} 
                    totalPosts={serchPosts === null ? posts.length : serchPosts.length} 
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
                                    {post.user !==undefined ? <p>Posted by: <Link to={`/profile/${post.user}`}>{post.user}</Link></p> : <></>}
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