import "./Missing.css"
import { Link } from "react-router-dom"

export const Missing = () => {
    return (
        <div className="missing">
            <h1>404</h1>
            <p>Page Not Found</p>
            <Link to="/">Go to Homepage</Link>
        </div>
    )
}