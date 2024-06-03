// import React from 'react'
import Navbar from "./Navbar"
import styling from "../../Styling/contact.module.css"

function Contact() {

  return (
    <>
        <Navbar/>
        <div>
            <h1>Contact Me!</h1>
            <div className={styling.linksHolder}>
              <button className={styling.button}>
                <img src="/public/google-gmail.svg" alt="" />
                {/* <span className={styling.hiddenInfo}>Mjishuu@gmail.com</span> */}
              </button>
              <button className={styling.button}>
                  <img src="/public/discord-icon.svg" alt="Discord" /> {/* Do animation that shows my username once hovered over image since cant link to profile, same with github but add click link */}
              </button>
              <button className={styling.button} onClick={() => window.open("https://github.com/Mjishu")} >
                  <img src="/public/github-icon.svg" alt="github" /> 
              </button>
            </div>
        </div>
    </>
  )
}

export default Contact