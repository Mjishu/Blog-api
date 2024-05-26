import React from 'react'

function App() {
  const [backendData, setBackendData] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(()=>{
    fetch("api")
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(data => setBackendData(data))
    .finally(() => setLoading(false))
  },[])
  
  React.useEffect(()=>{
    console.log(`backend Data: ${JSON.stringify(backendData)}`)
  },[backendData])

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
      {dataMapped}
    </div>
  )
}

export default App