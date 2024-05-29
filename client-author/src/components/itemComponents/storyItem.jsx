// import React from "react";
import Styling from "../../Styling/home.module.css"

export default function StoryItem(props){

    return(
        <div className={Styling.carouselItem}>
            <img src={props.image} alt="carousel-image" className={Styling.carouselImage}/>
            <div className={Styling.carouselTextItems}>
                <div>
                    <h6>{props.author}</h6>
                    <h4>{props.title}</h4>
                </div>
                <p>{props.description}</p>
            </div>
        </div>
    )
}