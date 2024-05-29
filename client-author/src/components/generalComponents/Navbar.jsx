import Styling from "../../Styling/navbar.module.css"
import { Link } from "react-router-dom"

export default function Navbar(){
    return (
        <header className={Styling.navbar}>
            <div className={`${Styling.linkHolder} ${Styling.holder1}`}>
                <a href="#">About</a>
                <Link to="/post/create">Create</Link>
                <a href="#">Contact</a>
            </div>
            <h1 className={Styling.webTitle}>Blog</h1>
            <div className={`${Styling.linkHolder} ${Styling.holder2}`}>
                <Link to={"/"}>Home</Link>
                <img className="hamburger-menu" src="/HamburgerMenu.svg" alt="Hamburger Menu" />
            </div>
        </header>
    )
}