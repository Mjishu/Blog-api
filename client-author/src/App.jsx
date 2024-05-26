import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'

function App() {
  const [backendData, setBackendData] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(()=>{
    fetch("api")
    .then(res =>  res.json()
    )
    .then(data => setBackendData(data))
    .finally(() => setLoading(false))
  },[])

  if(loading){
    return (
      <p>Loading...</p>
    )
  }

  const dataMapped = backendData.messages.map((user,i) => (
    <p key={i}>{user}</p>
  ))

  return (
    <div>
      <Navbar/>
      {/* {dataMapped} */}
      <Home/>
    </div>
  )
}

export default App