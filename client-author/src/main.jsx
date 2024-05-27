import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Error from "./components/Error.jsx"
import SignIn from "./components/Sign-in.jsx"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/> ,
  },
  {
    path:"sign-in",
    element: <SignIn/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
