import React from 'react'
import styling from "../../Styling/postEdit.module.css"
import Navbar from '../generalComponents/Navbar';

function PostEdit() {
    //? Should i make an api call so that i can populate the input value?
    const [backendData, setBackendData] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    const url = window.location.href
    const parts = url.split("/")
    const partsLength = parts.length - 2
    
    const jsonData={
        id: parts[partsLength]
    }

    React.useEffect(()=>{
        fetch(`/api`)
        .then(res => res.json())
        .then(data => setBackendData(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    },[])

    const [data,setData] = React.useState({ //todo Get data from item id ? and update the info to that?
        title: "",
        description: "",
        body: "",
        image: null,
        isPublished: false,
    })
    function handleSubmit(e){
        e.preventDefault();

        fetch(`/api/post/${jsonData.id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            // body: 
        })
    }

  return (
    <div>
        <Navbar/>
        <form method="PUT" className={styling.form}>
            <div className={styling.formDiv}>
                <input type="text" name="title" placeholder="title" />
                <input type="text" name="description" placeholder="description" />
                <textarea name="body" placeholder="body" className={styling.textBody}/>
                <input type="file" name="image" placeholder="image" />
                <input type="checkbox" name="isPublished" placeholder="isPublished" />
                <button type="submit">Update</button>
            </div>
        </form>
    </div>
  )
}

export default PostEdit