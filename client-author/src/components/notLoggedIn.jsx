// import React from 'react'
import { Link } from 'react-router-dom'

function NotLoggedIn() {
    return( 
    <>
        <h4>You are not signed in</h4>
        <Link to="/sign-in">Login</Link>
        <Link to="/sign-up">Sign Up</Link>
    </>
)
}

export default NotLoggedIn