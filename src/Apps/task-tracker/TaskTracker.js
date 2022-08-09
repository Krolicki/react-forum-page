import './TaskTracker.css'
import { AddTask, Header, Tasks } from './Components'
import { useEffect, useState } from 'react'

export const TaksTracker = () => {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false)
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:5000/tasks')
        const data = await response.json()

        return(data)
    }

    const fetchTask = async (id) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await response.json()

        return(data)
    }

    useEffect(()=>{
        const getTasks = async () => {
            const tasksData = await fetchTasks()
            setTasks(tasksData)
        }
        getTasks()
    },[])

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
        setTasks(tasks.filter( (task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToUpdate = await fetchTask(id)

        setTasks(tasks.map((task) => 
        task.id === id
        ? {...task, reminder: !task.reminder} 
        : task
        ))
    }

    const addTask = async  (task) => {
        const response = await fetch(`http://localhost:5000/tasks`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await response.json()
        //const id = (tasks.length > 0) ? (tasks[tasks.length-1].id  +1) : 1
        //const newTask = {id, ...task}
        //setTasks([...tasks, newTask])
        setTasks([...tasks, data])
    }

    return(
        <div>
            <Header onShow={() => setShowAddTaskForm(!showAddTaskForm)} showTask={showAddTaskForm}/>
            {showAddTaskForm && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? 
                <Tasks 
                    tasks={tasks} 
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                />
                : 'No tasks'
            }
        </div>
    )
}