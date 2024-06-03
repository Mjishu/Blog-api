import React from 'react'
import Home from './components/generalComponents/Home'
import Navbar from './components/generalComponents/Navbar'
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom'

function App() {
  const [backendData, setBackendData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate();
  const [backendUserData,setBackendUserData] = React.useState(null)


  React.useEffect(()=>{
    fetch("api/post")
    .then(res =>  res.json())
    .then(data => setBackendData(data))
    .finally(() => setLoading(false))
  },[])

  
  React.useEffect(()=>{ 
    try{
      fetch("/api/user")
      .then(res => res.json())
      .then(data => setBackendUserData(data))
      .catch(error => console.error(error))
    }catch(error){
      console.error(error)
    }
  },[])
  
  if(loading){
    return (
      <p>Loading...</p>
    )
  }
  
  function handleClick(id){
    navigate(`/post/${id}`)
  }
  
  const dataMapped = backendData.map((item) => {
    // if(item.isPublished){ //! Implement this for user side not author side
        return <Home 
        author={item.user.username}
        key={item._id} 
        description={item.description}
        title={item.title}
        handleClick={handleClick}
        id={item._id}
        image={item.image}
        isPublished={item.isPublished}
        />
    
})

  return (
    <div >
      <Navbar/>
      <div className="appContent">
        {dataMapped}
      </div>
      {!backendUserData &&
            <>
                <Link to="/sign-in">Sign in</Link>
                <Link to="/sign-up">Sign Up</Link>
            </>
            }
      
    </div>
  )
}

export default App


/* I need to protect the routes for signin and signup for users that are not logged in
also need to protect the Create component for users that are signed in as well as the edit and delete 
functionality */