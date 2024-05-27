import React from "react";

export default function StoryItem(props){

    return(
        <div className="carousel-item">
            <img src={props.img} alt="carousel-image" className="carousel-image" width={400} height={500}/>
            <div className="carousel-text-items">
                <div>
                    <h6>{props.type}</h6>
                    <h4>{props.title}</h4>
                </div>
                <p>{props.overview}</p>
            </div>
        </div>
    )
}