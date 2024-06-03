// import React from 'react'
import {Link} from "react-router-dom"

function Error() {
  return (
    <div>
        <h1>This page does not exist!</h1>
        <Link to="/">Go Home</Link>
    </div>
  )
}

export default Error