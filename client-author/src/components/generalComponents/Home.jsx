// import React from "react";
import StoryItem from "../itemComponents/storyItem";
import Styling from "../../Styling/home.module.css"
import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

export default function Home(props){
    return(
        <>
            <h1>{props.name}</h1>
            <div className={Styling.carousel} onClick={() => props.handleClick(props.id)} >
                <StoryItem
                    image={props.image}
                    title={props.title}
                    description={props.description} // ?
                    author={props.author}
                />

            </div>
            <Link to="/sign-in">Sign in</Link>
            <Link to="/sign-up">Sign Up</Link>
        </>
    )
}