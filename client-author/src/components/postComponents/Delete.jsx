// import React from 'react'
import { /* useLocation ,*/useNavigate } from "react-router-dom"
import Navbar from "../generalComponents/Navbar";

function Delete() { //TODO I dont think its sending the id to the backend to get deleted
  const navigate = useNavigate()
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