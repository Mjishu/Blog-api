// import React from 'react'
import Styling from "../../Styling/userInteraction.module.css"

function SignIn() {
  return (
    <div className={Styling.content}>
        <h1>Sign In</h1>
        <form action="" method='POST' className={Styling.form}>
            <input type="text" name='username' placeholder='Username...' />
            <input type="password" name='password' placeholder='Password...' />
            <button type="submit">Sign In</button>
        </form>
    </div>
  )
}

export default SignIn