import React from 'react'
import Home from './components/generalComponents/Home'
import Navbar from './components/generalComponents/Navbar'
import {useNavigate} from "react-router-dom"

function App() {
  const [backendData, setBackendData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate();

  React.useEffect(()=>{
    fetch("api/post")
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
  
  const dataMapped = backendData.map((item) => (
    <Home 
        author={item.user.username}
        key={item._id} 
        description={item.description}
        title={item.title}
        handleClick={handleClick}
        id={item._id}
        image={item.image}
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