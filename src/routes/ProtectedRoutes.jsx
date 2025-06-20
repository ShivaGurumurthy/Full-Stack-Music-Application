import React from 'react'
import { useContext } from 'react'
import { AuthContextAPI } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = (props) => {
    let {authUser} = useContext(AuthContextAPI)

  if(authUser){
    return props.children
    
  }
  else{
    return <Navigate to="/auth/login"/> 
  }
}

export default ProtectedRoutes