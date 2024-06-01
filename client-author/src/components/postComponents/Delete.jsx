import React from 'react'
import {useNavigate } from "react-router-dom"
import Navbar from "../generalComponents/Navbar";
import NotLoggedIn from '../notLoggedIn';

function Delete() { //TODO I dont think its sending the id to the backend to get deleted
  const navigate = useNavigate()
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
  function handleSubmit(event){
    event.preventDefault();
    const url = window.location.href
    const parts = url.split("/")
    const partsLength = parts.length - 2
    
    const jsonData = {
      id: parts[partsLength]
    }

    // console.log(id)
    const fetchOptions = {
      method:"DELETE",
      headers:{
        'Content-Type': "application/json",
      },
      body: jsonData
    }

    fetch(`/api/post/${jsonData.id}/delete`, fetchOptions)
    .catch(error => console.error(error))

    navigate("/")
  }

  if(loading){
    return <p>Loading...</p>
  }

  if(!backendData){
    return <NotLoggedIn/>
  }
  
  return (
    <div>
      <Navbar/>
       <p>Are you sure you want to delete this Post?</p>
       <form onSubmit={handleSubmit} >
        <input type="hidden" id="postid" name="postid"  />{/* value={props.post._id} */}
        <button type="submit" >Delete</button>
       </form>
    </div>
  )
}

export default Delete