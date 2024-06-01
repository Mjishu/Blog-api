import React from 'react'
import Styling from "../../Styling/userInteraction.module.css"
import { useNavigate } from "react-router-dom";


function SignIn() {
  const [response,setResponse] = React.useState(null)
  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();
    const jsonData= {
      username: event.target.username.value,
      password: event.target.password.value
    }

    const fetchParams ={
      method:"POST",
      headers:{
        'Content-Type': "application/json",
      },
      body: JSON.stringify(jsonData)
    }
    
    fetch("/api/user/log-in", fetchParams) 
    .then(res => res.json())
    .then(data => {
      setResponse(data)
      console.log(data)
    })
    .catch(error => console.error(error))

  }
  React.useEffect(()=>{
    if(response && response.message === "success"){
        navigate("/profile")
    }},[response,navigate])

  return (
    <div className={Styling.content}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className={Styling.form}>
            <input type="text" name='username' placeholder='Username...' />
            <input type="password" name='password' placeholder='Password...' />
            <button type="submit">Sign In</button>
        </form>
    </div>
  )
}

export default SignIn