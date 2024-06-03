import React from 'react'
import {useParams} from "react-router-dom"
import styling from "../../Styling/postDetail.module.css"
import Navbar from "../generalComponents/Navbar"
import { Link } from 'react-router-dom'
import CommentsCreate from '../commentComponents/commentsCreate'
import Comments from '../commentComponents/Comments'
// import { useNavigate } from 'react-router-dom'

function PostDetail() {
  const {id} = useParams();
  const [apiItems, setApiItems] = React.useState(null)
  const [post,setPost] = React.useState(null)
  const [loading,setLoading] = React.useState(true)

  //?-------------------Comments items -------------------------------------
  const [formData,setFormData] = React.useState({
    username:"",
    title:"",
    description:"",
    post: null
})
  const [commentsData, setCommentsData] = React.useState([])
  // const [commentsMapped, setCommentsMapped] = React.useState([])

  //*---------------------Fetches/UseEffects--------------------------------------
  // Fetches  post API
  React.useEffect(()=>{
    fetch(`/api/post`)
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
        setFormData(prevData =>  {
          return {...prevData, post:foundPost._id}
        })
      }
    }
  },[id,apiItems])

  React.useEffect(()=>{
    if (post){
      const fetchParams = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({id:post._id})
      }

      fetch(`/api/comments`,fetchParams)
      .then(res => res.json())
      .then(data=> setCommentsData(data))
      .catch(error => console.error(`error: ${error}`))

    }
  },[post])

  //! Something wrong here, its not mapping properly
  const commentsMapped= commentsData.map((comment)=> (
    <Comments 
    title={comment.title} 
    key={comment._id} 
    id={comment._id}
    description={comment.description} 
    author={comment.username}
    date={comment.date}
    handleDelete={handleCommentDelete}
    /> 
  ));

  if (loading){
    return <p>Loading...</p>
  }

  if (!post){
    return <p>Post not found</p>
  }
  
  //?---------------------Comments code--------------------------------------
  function handlecommentSubmit(e){
    e.preventDefault()
    
    const fetchparams ={
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(formData) //! Gotta do the silly json thing
    }
    
    fetch("/api/comment/create",fetchparams)
    .catch(error => console.error(`error: ${error}`))

    setFormData({
      username:"",
      title:"",
      description:"",
    
    })
    
  }
  
  function handleCommentChange(e){
    const {value,name} = e.target
    setFormData(prevFormData => {
      return{
        ...prevFormData,
        [name]: value
      }
      
    })
  }

  function handleCommentDelete(id){
    const fetchParams = {
      method : "DELETE",
      headers:{"Content-Type": 'application/json'},
      body: JSON.stringify({id: id})
    }

    fetch("/api/comment/delete",fetchParams)
    .then(res => res.json())
    .then(data => data.message === "success" && console.log("yay")) 
    .catch(error => console.log(`error ${error.message}`))
  }
  
    
  //* Map over the comments and then call that item in the return
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
        <hr />
        <CommentsCreate handleChange={handleCommentChange} handleSubmit={handlecommentSubmit} formData={formData}/>
        {commentsMapped}
      </div>
    </>
  )
}

//todo Comments when created/updated/deleted dont show you have to reload the page, figure out a way to fix this

export default PostDetail