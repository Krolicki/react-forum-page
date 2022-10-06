import useAuth from "../hooks/useAuth"
import { Link, useOutletContext } from "react-router-dom"
import "./styles/Profile.css"
import { useEffect, useState } from "react"
import { Loader } from "./Loader"

export const Profile = () => {
    const {auth} = useAuth()
    const uid = useOutletContext()
    const [loading, setLoading] = useState()

    const [totalPosts, setTotalPosts] = useState(0)
    const [lastPost, setLastPost] = useState(null)
    const [bestPost, setBestPost] = useState()

    useEffect(()=>{

        const getUserPosts = async () => {
            setLoading(true)
            const postsFromAPI = await fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/posts.json?orderBy=%22user%22&equalTo=%22${auth.user}%22&auth=${uid}`)
                .then(respsonse => {
                    if (respsonse.ok)
                        return respsonse.json()
                    throw respsonse
                })
                .then(respsonse=>{
                   // setTotalPosts(Object.values(respsonse).length)
                    //console.log(totalPosts)
                    //setLastPost(Object.values(respsonse)[totalPosts - 1])
                    return Object.values(respsonse)
                })
                .catch((err) => {
                    console.log(err)
                })
                let total = postsFromAPI.length
                setTotalPosts(total)
                setLastPost(postsFromAPI[total - 1])
                let mostViews = Number.MIN_VALUE
                let tempBestPost = {}
                postsFromAPI.forEach(post => { 
                     if(post.views > mostViews){
                        tempBestPost = post
                        mostViews = post.views
                     }
                })
                setBestPost(tempBestPost)
                
            setLoading(false)
        }
        getUserPosts()
    },[])
    if (loading) {
        return <Loader title={`Loading profile...`} />
    }

    return(
        <div className="profile-container">
            <h1>User: {auth.user}</h1>
            <p>Total number of posts: {totalPosts}</p>
            {lastPost ? 
                <span className="profile-span">
                    <p>Last post: </p>
                    <Link to={`/post/${lastPost.id}`} >
                        {lastPost.title}
                    </Link>
                    <p>{lastPost.edit ? `, edited: ${lastPost.edit}` : `, posted: ${lastPost.date}`} </p><br/>
                </span>
                : <></>}
            {bestPost ? 
                <span className="profile-span">
                    <p>Most viewed post: </p>
                    <Link to={`/post/${bestPost.id}`} >
                        {bestPost.title}
                    </Link> 
                    <p>, views: {bestPost.views}</p>
                </span>
                : <></>}
        </div>
    )
}