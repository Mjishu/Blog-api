import App from "./App"
import Error from "./components/mainComponents/Error"
import PostDetail from "./components/postComponents/PostDetail"
import Contact from "./components/mainComponents/Contact"

const routes =[
    {
        path:"/",
        element:<App/>,
        errorElement:<Error/>
    },
    {
        path:"/post/:id",
        element:<PostDetail/>
    },
    {
        path:"/contact",
        element:<Contact/>
    }
]

export default routes