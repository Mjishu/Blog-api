// import React from 'react'
import { useLocation,useNavigate } from "react-router-dom"

function Delete(props) {

  
  return (
    <div>
       <h1>{props.title}</h1>
       <p>Are you sure you want to delete?</p>
       <form action="" >
        <input type="hidden" id="postid" name="postid"  />{/* value={props.post._id} */}
        <button type="submit" onClick={() => console.log(window.location.href, "mmeow")}>Delete</button>
       </form>
    </div>
  )
}

export default Delete