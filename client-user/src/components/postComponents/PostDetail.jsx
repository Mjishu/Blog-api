import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../mainComponents/Navbar';
import { Link } from 'react-router-dom';
import styling from "../../Styling/postDetail.module.css"

function PostDetail() {
    const {id} = useParams();
    const [backendData,setBackendData] = React.useState(null)
    const [post,setPost] = React.useState(null)
    const [loading,setLoading] = React.useState(true)

    React.useEffect(()=>{
        fetch("/api/post")
        .then(res => res.json())
        .then(data => setBackendData(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    },[id])

    React.useEffect(()=>{
        if(backendData){
            const postFound = backendData.find(item => item._id === id)
            if(postFound){
                setPost(postFound)
            }
        }
    },[id,backendData])

    if(loading){
        return (
            <p>Loading....</p>
        )
    }

    if(!post){
        return (
            <>
                <p>Post Not Found</p>
                <Link to="/">Home</Link>
            </>
    )
    }

  return (
    <div>
        <Navbar/>
        <div>
        <img src={post.image} className={styling.coverImage} alt="Image for Article" />
        <div className="text">
          <h6>{post.date}</h6>
          <h1>{post.title}</h1>
          <h3 className={styling.author}>{post.user.username}</h3>
          <p>{post.description}</p>
          <p>{post.body}</p>
        </div>
        </div>
    </div>
  )
}

export default PostDetail