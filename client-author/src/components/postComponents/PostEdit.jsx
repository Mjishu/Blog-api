import React from 'react'
import styling from "../../Styling/postEdit.module.css"
import Navbar from '../generalComponents/Navbar';
import { useNavigate } from 'react-router-dom';

function PostEdit() {
    //? Should i make an api call so that i can populate the input value?
    const [backendData, setBackendData] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [data,setData] = React.useState({ //todo Get data from item id ? and update the info to that?
        title: "",
        description: "",
        body: "",
        image: null,
        isPublished: false,
    })

    const url = window.location.href
    const parts = url.split("/")
    const partsLength = parts.length - 2
    
    const postId = parts[partsLength]

    const navigate = useNavigate()

    React.useEffect(()=>{
        fetch(`/api/post`)
        .then(res => res.json())
        .then(data => setBackendData(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    },[])

    React.useEffect(()=>{
        // console.log(backendData)
        if(backendData.length >= 1){
            const foundPost = backendData.find(item => item._id === postId)
            if(foundPost){
                console.log("found post ",foundPost)
                setData({
                        title: foundPost.title,
                        description: foundPost.description,
                        body: foundPost.body,
                        image: foundPost.image,
                        isPublished: foundPost.isPublished}
                )
            }
        }
    },[backendData,postId])

    function handleSubmit(e){
        e.preventDefault();
        const jsonData = {
            title:data.title,
            description: data.description,
            body: data.body,
            image: data.image,
            isPublished: data.isPublished
        }

        fetch(`/api/post/${postId}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData) //?! Do i need to put it in a seperate object first like the other json datas 
        })
        navigate("/")
    }

    function handleChange(event){
        const {name,value,type,checked,files} = event.target
        setData(prevData => {
          return {
            ...prevData, 
            [name]: type === "checkbox" ? checked :(type === "file" ? files[0] : value)
          }
        })
      }

    if(loading){
        return(<p className={styling.loading}>Loading...</p>)
    }

    return (
    <div>
        <Navbar/>
        <form onSubmit={handleSubmit} className={styling.form}>
            <div className={styling.formDiv}>
                <label htmlFor="title">Title</label>
                <input 
                    type="text"
                    name="title" 
                    placeholder= 'title' 
                    value={data.title}
                    onChange={handleChange}
                    />
                <label htmlFor="description">Description</label>
                <input 
                    type="text" 
                    name="description" 
                    placeholder='description' 
                    value={data.description}
                    onChange={handleChange}
                    />
                <label htmlFor="body">Body</label>    
                <textarea 
                    name="body" 
                    className={styling.textBody}
                    placeholder='body' 
                    value={data.body}
                    onChange={handleChange}
                />
                <label htmlFor="image">Image</label>
                <input  
                    type="file"  
                    name="image"     
                    onChange={handleChange}
                    // value={data.image} //todo Implement a way to change the image
                    accept='image/png, image/jpeg'
                    />
                <label htmlFor="isPublished">Publish</label>
                <input 
                    type="checkbox" 
                    name="isPublished" 
                    placeholder="isPublished" 
                    checked={data.isPublished}
                    onChange={handleChange}
                    />
                <button type="submit">Update</button>
            </div>
        </form>
    </div>
  )
}

export default PostEdit