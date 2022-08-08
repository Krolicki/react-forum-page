import { Button } from "./Button"

export const Header = ({ onShow, showTask }) => {
    return (
        <header>
            <h1>TaskTracker</h1>
            <Button
                onClick={onShow}
                text={showTask ? 'Close' : 'Add'}
                color={showTask ? 'rgb(155, 19, 19)' : 'rgb(33, 155, 19)'}
            />
        </header>
    )
}