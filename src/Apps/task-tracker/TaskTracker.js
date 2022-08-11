import './TaskTracker.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AddTask, Footer, Header, Tasks, About, TaskDetails } from './Components'
import { useEffect, useState } from 'react'

export const TaksTracker = () => {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false)
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:5000/tasks')
        const data = await response.json()

        return (data)
    }

    const fetchTask = async (id) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await response.json()

        return (data)
    }

    useEffect(() => {
        const getTasks = async () => {
            const tasksData = await fetchTasks()
            setTasks(tasksData)
        }
        getTasks()
    }, [])

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToUpdate = await fetchTask(id)
        const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder }

        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })

        const data = await response.json()

        setTasks(tasks.map((task) =>
            task.id === id
                ? { ...task, reminder: data.reminder }
                : task
        ))
    }

    const addTask = async (task) => {
        const response = await fetch(`http://localhost:5000/tasks`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await response.json()
        //const id = (tasks.length > 0) ? (tasks[tasks.length-1].id  +1) : 1
        //const newTask = {id, ...task}
        //setTasks([...tasks, newTask])
        setTasks([...tasks, data])
        setShowAddTaskForm(false)
    }

    return (
        <BrowserRouter>
            <div className='container'>
                <Header onShow={() => setShowAddTaskForm(!showAddTaskForm)} showTask={showAddTaskForm} />

                <Routes>
                    <Route path='/' element={ 
                        <>
                            <div className={`add-form  ${showAddTaskForm && 'show-element'}`}>
                            { <AddTask onAdd={addTask}  showForm = {showAddTaskForm} />}
                            </div>
                            {tasks.length > 0 ?
                                <Tasks
                                    tasks={tasks}
                                    onDelete={deleteTask}
                                    onToggle={toggleReminder}
                                />
                                : 'No tasks'
                            }
                        </>
                    }></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/task/:id' element={<TaskDetails />}></Route>
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}