import { useEffect, useState } from "react"

export const useGetPost = (id) => {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)
    const [postNotFound, setPostNotFound] = useState(false)

    useEffect(()=>{
        const getPost = async (id) => {
            setLoading(true)
            const postFromAPI = await fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/posts.json?orderBy=%22id%22&equalTo=${id}`)
                .then(respsonse => {
                    if (respsonse.ok)
                        return respsonse.json()
                    throw respsonse
                })
                .catch((err) => {
                    console.log(err)
                })
            if(Object.values(postFromAPI)[0] !== undefined)
                setPost(Object.values(postFromAPI)[0])
            else
                setPostNotFound(true)
            setLoading(false)
        }
        getPost(id)
    },[id])

    return {post, loading, postNotFound}
}