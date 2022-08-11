import { Button } from "./Button"
import { useLocation } from "react-router-dom"

export const Header = ({ onShow, showTask }) => {
    const location = useLocation()
    
    return (
        <header>
            <h1>TaskTracker</h1>
            {location.pathname ==='/'&& <Button
                onClick={onShow}
                text={showTask ? 'Close' : 'Add'}
                color={showTask ? 'rgb(155, 19, 19)' : 'rgb(33, 155, 19)'}
            />}
        </header>
    )
}