import { useState } from "react"

export const AddTask = ({onAdd}) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!text){
            alert("Name cannot be empty")
        }
        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }


    return(
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input 
                    type='text' 
                    placeholder="name" 
                    value={text}
                    onChange={e=>setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Date and Time</label>
                <input 
                    type='text' 
                    placeholder="date and time"
                    value={day}
                    onChange={e=>setDay(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label>Reminder</label>
                <input 
                    type='checkbox' 
                    value={reminder}
                    checked={reminder}
                    onChange={e=>setReminder(e.currentTarget.checked)}
                />
            </div>
            <input className="form-control submit-button" type="submit" value="Save" />
        </form>
    )
}