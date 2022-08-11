import {FaTimes, FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Task = ({
    task, 
    onDelete, 
    onToggle
}) => {

    return(
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}
                <div>
                <Link to={`/task/${task.id}`}>
                    <FaSearch 
                        style={{
                            color: 'black',
                            cursor:'pointer',
                            marginRight: '10px'
                        }}
                    />
                </Link>
                <FaTimes 
                    className='close-icon'
                    style={{
                        color: 'red', 
                        cursor:'pointer',
                        fontSize: '1.5rem'
                    }}
                    onClick={() => onDelete(task.id)}
                />
                </div>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}