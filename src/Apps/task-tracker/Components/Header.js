import { Button } from "./Button"

export const Header = () =>{
    const clickEvent = () => {
        console.log("click")
    }
    
    return(
        <header>
            <h1>TaskTracker</h1>
            <Button onClick={clickEvent} text="Add"/>
        </header>
    )
}