import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Button } from "./Button"

export const TaskDetails = () => {
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    const [error, setError] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTask = async () => {
            const response = await fetch(`http://localhost:5000/tasks/${params.id}`)

            if(!response.ok){
                setError(true)
                navigate('/')
            }

            const data = await response.json()
            setTask(data)
            setLoading(false)
        }
        fetchTask()
    }, [])


    if(error){
        return <Navigate to='/' />
    }

    return (
        <div>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div className="task-details">
                    <h2>{task.text}</h2>
                    <p>{task.day}</p>
                    <Button text='Go back' color={'rgb(32, 98, 161)'} onClick={()=>{navigate('/')}} />
                </div>    
            )}
        </div>
    )
}