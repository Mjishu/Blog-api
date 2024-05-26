
export default function Navbar(){
    return (
        <header className="navbar">
            <div className="link-holder holder-1">
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Contact</a>
            </div>
            <h1 className="web-title">Blog</h1>
            <div className="link-holder holder-2">
                <a href="#">Home</a>
                <img className="hamburger-menu" src="../../public/HamburgerMenu.svg" alt="Hamburger Menu" />
            </div>
        </header>
    )
}