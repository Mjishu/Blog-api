import React from "react";

export default function Carousel(props){

    return(
        <div className="carousel-item">
            <img src={props.img} alt="carousel-image"  width={400} height={500}/>
            <h6>{props.type}</h6>
            <h4>{props.title}</h4>
            <p>{props.overview}</p>
        </div>
    )
}