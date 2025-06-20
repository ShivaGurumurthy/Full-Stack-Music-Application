import React, { useContext } from 'react'
import { UserContextAPI } from '../Context/UserContext'

const AdminRoutes = () => {
    let { userProfile } = useContext(UserContextAPI)

    if(userProfile?.role === "admin"){
      return props.children
      
    }
    else{
      return <Navigate to="/"/> 
    }
}

export default AdminRoutes