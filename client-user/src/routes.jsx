import App from "./App"
import Error from "./components/mainComponents/Error"
import PostDetail from "./components/postComponents/PostDetail"

const routes =[
    {
        path:"/",
        element:<App/>,
        errorElement:<Error/>
    },
    {
        path:"/post/:id",
        element:<PostDetail/>
    }
]

export default routes