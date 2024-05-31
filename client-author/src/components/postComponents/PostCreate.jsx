import React from 'react'
import styling from "../../Styling/postCreate.module.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../generalComponents/Navbar';

function PostCreate(props) {
  const [formData,setFormData] = React.useState({
    title: "",
    description: "",
    body: "",
    image: null,
    isPublished: false,
  })

  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();

    const jsonData = {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      isPublished: formData.isPublished,
    }
    if(formData.image){
      jsonData.image = formData.image
    }
    // console.log(formData, ` image: ${formData.image}`)
    
    const fetchOptions = {
      method:"POST",
      headers:{
        'Content-Type': "application/json",
      },
      body: JSON.stringify(jsonData)
    }

    fetch("/api/post/create", fetchOptions)
    .catch(error => console.error("error", error))

    navigate("/")
  }

  function handleChange(event){
    const {name,value,type,checked,files} = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData, 
        [name]: type === "checkbox" ? checked :(type === "file" ? files[0] : value)
      }
    })
  }

  return (
    <div>
        <Navbar/>
        <h1>{props.title}</h1>
        <form onSubmit={handleSubmit} className={styling.createForm}>
            <div>
              <label htmlFor="title">Title: </label>
              <input 
                type="text" 
                name="title" 
                id="title"
                onChange={handleChange}
                value={formData.title}
                />

              <label htmlFor="description">Overview: </label>
              <input 
                type="text" 
                name="description" 
                id="description"
                onChange={handleChange}
                value={formData.description}
                />

              <label htmlFor="body" >Body: </label>
              <textarea 
                name="body" 
                id="body" 
                className={styling.textBody}
                onChange={handleChange}
                value={formData.body}
                />

              <label htmlFor="image">Cover Image:</label>
              <input 
                type="file" 
                name="image" 
                id="image" 
                onChange={handleChange}
                accept='image/png, image/jpeg'
                />

              <label htmlFor="isPublished">Published: </label>
              <input 
              type="checkbox" 
              name="isPublished" 
              id="isPublished" 
              onChange={handleChange}
              checked={formData.isPublished}
              />

              <button>Create</button>
            </div>
        </form>
    </div>
  )
}

export default PostCreate