import React from 'react'
import Styling from "../../Styling/userInteraction.module.css"
import Navbar from '../generalComponents/Navbar';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData,setFormData] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",

  })
  const navigate = useNavigate

  function handleSubmit(e){ //! If formData.pwd = formData.confpwd then do the fetch
    e.preventDefault();
    
    const jsonData = {
      username: formData.username,
      password: formData.password,
    }

    const fetchOptions = {
      method: "POST",
      headers:{
        'Content-Type':"application/json"
      },
      body: JSON.stringify(jsonData)
    }
    if(formData.password === formData.confirmPassword){
      fetch("/api/user/signup", fetchOptions)
      .then(res=>res.json())
      .then(data => console.log(data))
      navigate("/")
    }else{
      console.error("passwords did not match")
    }
  }

  function handleChange(event){
    const {name,value} = event.target
    setFormData(prevFormData => {
      return{
        ...prevFormData,
        [name]:value
      }
    })
  }

  return (
    <>
    <Navbar/>
    <div className={Styling.content}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className={Styling.form}>
            <input type="text" name="username" onChange={handleChange} required minLength={3} placeholder="username"/>
            <input type="password" name="password" onChange={handleChange} required minLength={5} placeholder="password..." />
            <input type="password" name='confirmPassword' onChange={handleChange} required minLength={5} placeholder='Confirm Password...' />
            <button type="submit">Sign Up</button>
        </form>
    </div>
    </>
  )
}

export default SignUp