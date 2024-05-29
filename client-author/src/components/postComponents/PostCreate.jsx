// import React from 'react'
import styling from "../../Styling/postCreate.module.css"

function PostCreate(props) {
  return (
    <div>
        <h1>{props.title}</h1>
        <form action="" method="POST" className={styling.createForm}>
            <div>
              <label htmlFor="title">Title: </label>
              <input type="text" name="title" id="title" />

              <label htmlFor="description">Overview: </label>
              <input type="text" name="description" id="description"/>

              <label htmlFor="body" >Body: </label>
              <textarea name="body" id="body" className={styling.textBody}></textarea>

              <label htmlFor="myfile">Cover Image:</label>
              <input type="file" name="myfile" id="myfile" />

              <label htmlFor="isPublished">Published: </label>
              <input type="checkbox" name="isPublished" id="isPublished" />

              <button>Create</button>
            </div>
        </form>
    </div>
  )
}

export default PostCreate