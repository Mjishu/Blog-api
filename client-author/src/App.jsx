import React from 'react'
import Home from './components/generalComponents/Home'
import Navbar from './components/generalComponents/Navbar'
import {useNavigate} from "react-router-dom"

function App() {
  const [backendData, setBackendData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate();

  React.useEffect(()=>{
    fetch("api")
    .then(res =>  res.json())
    .then(data => setBackendData(data))
    .finally(() => setLoading(false))
  },[])

  if(loading){
    return (
      <p>Loading...</p>
    )
  }
 

  function handleClick(id){
    navigate(`/post/${id}`)
  }
  
  const dataMapped = backendData.map((user) => (
    <Home 
        author={user.user.username}
        key={user._id} 
        description={user.description}
        title={user.title}
        handleClick={handleClick}
        id={user._id}
        image={user.image}
      />
  ))

  return (
    <div >
      <Navbar/>
      <div className="appContent">
        {dataMapped}
      </div>
      
    </div>
  )
}

export default App