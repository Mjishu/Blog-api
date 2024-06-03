// import React from 'react'

function CommentsCreate(props) {
  return (
    <div>   
        <h3>Comments</h3>
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text"
                name="username"
                id='username'
                onChange={props.handleChange}
                value={props.formData.username}
            />
            <label htmlFor="title">Title</label>
            <input type="text"
                name="title"
                onChange={props.handleChange}
                value={props.formData.title}
            />
            <label htmlFor="description">Description</label>
            <input type="text"
                name="description"
                onChange={props.handleChange}
                value={props.formData.body}
            />
            <button>Comment</button>
        </form>
    </div>
  )
}

export default CommentsCreate