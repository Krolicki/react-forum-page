import { useEffect, useState } from "react"

export const useGetPost = (id) => {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    const [postNotFound, setPostNotFound] = useState(false)

    useEffect(()=>{
        const getPost = async (id) => {
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
            if(postFromAPI.length !== 0)
                setPost(postFromAPI[0])
            else
                setPostNotFound(true)
            setLoading(false)
        }
        getPost(id)
    },[id])

    return {post, loading, postNotFound}
}