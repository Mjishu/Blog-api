// import React from 'react'
import Styling from "../../Styling/userInteraction.module.css"

function SignUp() {
  return (
    <div className={Styling.content}>
        <h1>Sign Up</h1>
        <form action="" method="POST" className={Styling.form}>
            <input type="text" name="username" placeholder="username"/>
            <input type="password" name="password" placeholder="password..." />
            <input type="password" name='confirmPassword' placeholder='Confirm Password...' />
            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp