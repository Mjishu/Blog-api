// import React from "react";
import StoryItem from "../itemComponents/storyItem";
import Styling from "../../Styling/home.module.css"
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

export default function Home(props){ //! I dont think this component is even really needed  i could just call storyItem?
    return(
        <>
            <h1>{props.name}</h1>
            <div className={Styling.carousel} onClick={() => props.handleClick(props.id)} >
                <StoryItem
                    image={props.image}
                    title={props.title}
                    description={props.description} // ?
                    author={props.author}
                    isPublished= {props.isPublished}
                />

            </div>
            
        </>
    )
}