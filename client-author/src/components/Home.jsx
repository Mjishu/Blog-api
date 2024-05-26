import React from "react";
import Carousel from "./Article_Carousel";

export default function Home(props){

    return(
        <>
            <Carousel 
                img="https://randomwordgenerator.com/img/picture-generator/54e1dd404c51ab14f1dc8460962e33791c3ad6e04e5074417d2e7ed6924bc4_640.jpg"
                title="Test Title"
                type="Article"
                overview="This is a test description for the test title which is an article"
            />
        </>
    )
}