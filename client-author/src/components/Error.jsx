import {Link} from "react-router-dom"

export default function Error(){
    return(
        <div className="Error-Holder">
            <h1>Error</h1>
            <p>The Page or Item you are looking for does not exist</p>
            <Link to="/"></Link>
        </div>
    )
}