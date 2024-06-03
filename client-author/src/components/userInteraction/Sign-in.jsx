import React from 'react'
import Styling from "../../Styling/userInteraction.module.css"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

//TODO Add custom value handle 

function SignIn() {
  const [response,setResponse] = React.useState(null)
  const navigate = useNavigate();
  const [loading,setLoading]= React.useState(true)
  const [backendData,setBackendData] = React.useState(null)

  React.useEffect(()=>{ 
    try{
        fetch("/api/user")
        .then(res => res.json())
        .then(data => setBackendData(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }catch(error){
        console.error(error)
    }
},[])

React.useEffect(()=>{
  
},[backendData])

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

    if(loading){
      return <p>Loading...</p>
    }

    
    if(backendData){ //! How to make this work
        return (
          <>
            <h3>You are already logged in</h3>
            <Link to="/">Go home?</Link>
          </>
        )
    }

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