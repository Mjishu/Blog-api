import React from 'react'
import Navbar from './components/mainComponents/Navbar'
import PostItem from './components/postComponents/PostItem';
import styling from "./Styling/post.module.css"
import { useNavigate } from 'react-router-dom';

function App() {
  const [backendData, setBackendData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("/api/post")
    .then(res => res.json())
    .then(data => setBackendData(data))
    .finally(() => setLoading(false))
    .catch(error => console.error(error))
  },[])

  React.useEffect(() =>{
    console.log(backendData)
  },[backendData])

  function handleClick(id){
    navigate(`/post/${id}`)
  }

  const backendMapped = backendData.map((item) => {
    if(item.isPublished){
        return <PostItem 
        key={item._id}
        id={item._id}
        title={item.title}
        author={item.user.username}
        description={item.description}
        body={item.body}
        image={item.image}
        handleClick={handleClick}
        />
    }
  })

  if(loading){
    <p>Loading...</p>
  }

  return (
    <div>
      <Navbar/>
      <div className={styling.carousel}>
        {backendMapped}
      </div>
    </div>
  )
}

export default App