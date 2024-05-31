import React from 'react'
import {useParams} from "react-router-dom"
import styling from "../../Styling/postDetail.module.css"
import Navbar from "../generalComponents/Navbar"
import { Link } from 'react-router-dom'

function PostDetail() {
  const {id} = useParams();
  const [apiItems, setApiItems] = React.useState(null)
  const [post,setPost] = React.useState(null)
  const [loading,setLoading] = React.useState(true)

  // Fetches API
  React.useEffect(()=>{
    fetch(`/api`)
    .then(res => res.json())
    .then(data => {
      setApiItems(data)
      setLoading(false)
    })

  },[id])

  //Looks throught API data to find the id that matches
  React.useEffect(()=>{
    if(apiItems){
      const foundPost = apiItems.find(item => item._id ===id)
      if (foundPost){
        setPost(foundPost)
      }
    }
  },[id,apiItems])

  if (loading){
    return <p>Loading...</p>
  }

  if (!post){
    return <p>Post not found</p>
  }

  return (
    <>
      <Navbar/>
      <div className={styling.content}>
        <img src={post.image} className={styling.coverImage} alt="Image for Article" />
        <div className="text">
          <h6>{post.date}</h6>
          <h1>{post.title}</h1>
          <h3 className={styling.author}>{post.user.username}</h3>
          <p>{post.description}</p>
          <p>{post.body}</p>
        </div>
        <div className={styling.editContent}>
            <Link to="edit">Edit</Link>
            <Link to="delete">Delete</Link>
        </div>
      </div>
    </>
  )
}

export default PostDetail