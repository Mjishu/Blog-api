
function Comments(props) {
    return (
      <div>
          <h5>{props.title}</h5>
          <p>{props.date}</p>
          <h6>{props.author}</h6>
          <p>{props.description}</p>
          <button onClick={() => props.handleDelete(props.id)}>Delete</button>
      </div>
    )
  }
  
  export default Comments