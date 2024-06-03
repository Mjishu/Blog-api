import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../mainComponents/Navbar';
import { Link } from 'react-router-dom';
import styling from "../../Styling/postDetail.module.css"
import Comments from './Comments';
import CommentsCreate from './CommentsCreate';

function PostDetail() {
    const {id} = useParams();
    const [backendData,setBackendData] = React.useState(null)
    const [post,setPost] = React.useState(null)
    const [loading,setLoading] = React.useState(true)
    const [commentData,setCommentData] = React.useState([])
    const [formData,setFormData] = React.useState({
        username:"",
        title:"",
        description:"",
        post: null //! where to put post id
    })

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
                setFormData( prevData => {
                    return {...prevData,post:postFound._id}
                })
            }
        }
    },[id,backendData])

    //?-------------------Comments-------------------------------

    React.useEffect(() => {
        if(post){
            const fetchParams = {
                method: 'POST',
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({id:post._id})
            }
            fetch("/api/comments", fetchParams)
            .then(res=> res.json())
            .then(data => setCommentData(data))
            .catch(error => console.error(error))
        }
    },[post]) 

    function handleDelete(id){
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

    function handleSubmit(e){
        e.preventDefault()
        
        const fetchparams ={
          method:"POST",
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify(formData)
        }
        
        fetch("/api/comment/create",fetchparams)
        .catch(error => console.error(`error: ${error}`))
    
        setFormData({
          username:"",
          title:"",
          description:"",
        })
        
      }
      
      function handleChange(e){
        const {value,name} = e.target
        setFormData(prevFormData => {
          return{
            ...prevFormData,
            [name]: value
          }
          
        })
      }

    const commentsMapped = commentData.map((comment) => {
        return <Comments 
            title={comment.title} 
            key={comment._id} 
            id={comment._id}
            description={comment.description} 
            author={comment.username}
            date={comment.date}
            handleDelete={handleDelete}
        />
    })

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
        <CommentsCreate handleChange={handleChange} handleSubmit={handleSubmit} formData={formData}/>
        {commentsMapped}
    </div>
  )
}

export default PostDetail