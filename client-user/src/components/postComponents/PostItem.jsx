// import React from 'react'
import styling from "../../Styling/post.module.css"

function PostItem(props) {
  return (
    <div onClick={() => props.handleClick(props.id)}>
        <img src={props.image} alt="carousel-image" className={styling.carouselImage}/>
            <div className={styling.carouselTextItems}>
                <div>
                    <h6>{props.author}</h6>
                    <h4>{props.title}</h4>
                </div>
                <div>
                    <p>{props.description}</p>
                    <p>{props.isPublished ? "published" : "not published"}</p>
                </div>
            </div>
    </div>
  )
}

export default PostItem