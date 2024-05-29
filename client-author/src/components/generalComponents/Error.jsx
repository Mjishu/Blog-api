import {Link} from "react-router-dom"
import styling from "../../Styling/error.module.css"

export default function Error(){
    return(
        <div className={styling.errorHolder}>
            <h1>Error</h1>
            <p>The Page or Item you are looking for does not exist</p>
            <Link to="/" className={styling.link}>Go Home</Link>
        </div>
    )
}