import React from 'react'
import UserSidebar from './UserSidebar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='h-[calc(100vh-65px)] flex bg-slate-500'>
        <UserSidebar/>
        <Outlet/>
    </div>
  )
}

export default UserLayout