import React from 'react'

function App() {
  const [backendData, setBackendData] = React.useState()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(()=>{
    fetch('/api')
    .then(res => {
      console.log(`status code ${res.status}`)
      return res.json()})
    .then(data => {
      console.log (`data is ${JSON.stringify(data)}`)
      setBackendData(data)})
    .finally(()=> setLoading(false))
  },[])
  console.log(backendData)

  if(loading){
    return (
      <p>Loading...</p>
    )
  }

  // const dataMapped = backendData.users.map((user,i) => (
  //   <p key={i}>{user}</p>
  // ))

  return (
    <div>
      {backendData}
    </div>
  )
}

export default App