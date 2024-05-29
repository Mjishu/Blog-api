import Error from "./components/generalComponents/Error.jsx"
import SignIn from "./components/userInteraction/Sign-in.jsx"
import SignUp from './components/userInteraction/sign-up.jsx'
import PostDetail from './components/postComponents/PostDetail.jsx'
// import Home from "./components/generalComponents/Home.jsx"
import App from "./App.jsx"
import PostCreate from "./components/postComponents/PostCreate.jsx"
import Delete from "./components/postComponents/Delete.jsx"

const routes = [
    {
        path:"/",
        element:<App/> ,
        errorElement:<Error />
      },
      {
        path:"sign-in",
        element: <SignIn/>
      },
      {
        path:"sign-up",
        element:<SignUp/>
      },
      {
        path:"post/:id",
        element:<PostDetail/>
      },
      {
        path:"post/:id/delete",
        element: <Delete/>
      },
      {
        path:"post/create",
        element:<PostCreate/>
      }
]

export default routes;