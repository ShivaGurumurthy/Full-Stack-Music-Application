import React from 'react'
import { Outlet, RouterProvider } from 'react-router-dom'
import NavbarContainer from '../Components/Navbar/NavbarContainer'

const Layout = () => {
  return (
    <div>
        <NavbarContainer/>
        <Outlet/>
    </div>
  )
}

export default Layout