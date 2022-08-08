import './TaskTracker.css'
import { AddTask, Header, Tasks } from './Components'
import { useState } from 'react'

export const TaksTracker = () => {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false)
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'task1',
            day: '8 Sie 21:00',
            reminder: true
        },
        {
            id: 2,
            text: 'task2',
            day: '9 Sie 12:00',
            reminder: false
        }
    ])

    const deleteTask= (id) => {
        setTasks(tasks.filter( (task) => task.id !== id))
    }

    const toggleReminder= (id) => {
        setTasks(tasks.map((task) => 
        task.id === id
        ? {...task, reminder: !task.reminder} 
        : task
        ))
    }

    const addTask = (task) => {
        const id = (tasks.length > 0) ? (tasks[tasks.length-1].id  +1) : 1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])
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