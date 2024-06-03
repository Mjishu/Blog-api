import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../generalComponents/Navbar'
import { Link } from 'react-router-dom'

function Profile() {
    const [backendData, setBackendData] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    const navigate = useNavigate();

    React.useEffect(()=>{ 
        try{
            fetch("/api/user")
            .then(res => res.json())
            .then(data => setBackendData(data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
        }catch(error){
            console.error(error)
        }
        // if (!backendData.user){
        //     return (
        //         navigate("/")
        //     )
        // }
    },[])

    function handleSubmit(event){//! Need to make login route befoire i fix this
        event.preventDefault();

        console.log("logging out")
        fetch('/api/log-out')
        .then(res=>res.json())
        .then(data => {
            if(JSON.parse(data.success)){
                navigate("/")
        }})
    }

    if(loading){
        return <p>Loading...</p>
    }

  return (
    <div>
        <Navbar/>
        {backendData ?( //! idk if this updates after backend data gets checked? maybe useEffect here? or call the use effect here
            <>
                <h1>Profile</h1>
                <h4>
                    Hello, {backendData.username}
                </h4>
                <form action="" onSubmit={handleSubmit}>
                    <button>Logout</button>
                </form>
            </>) : (
                <>
                    <h4>Login to see your profile</h4>
                    <Link to={"/sign-in"}>Login</Link>
                </>
            )
        }
    </div>
  )
}

export default Profile