import React from 'react'
import { NavLink } from 'react-router-dom'
import { TbDashboard } from "react-icons/tb";
import { IoAlbums } from "react-icons/io5";

const AdminSidebar = () => {
  return (
    <div className='h-[calc(100vh-65px)] sticky top-[70px] w-[20%] bg-slate-600 px-4 py-8 shrink-0'>
        <ul className='text-4xl font-medium flex flex-col gap-15 m-5 cursor-pointer'>
        <li>
                <NavLink to="/admin" end className={(obj)=>{
                    let {isActive} = obj
                    return `py-3 px-4 w-[100%] rounded-xl hover:bg-sky-600 flex items-center gap-5 ${isActive && "hover: bg-sky-700"}`
                }}><TbDashboard />Dashboard</NavLink>
            </li>
           <li>
                <NavLink to="/admin/add-albums" end className={(obj)=>{
                    let {isActive} = obj
                   return `py-3 px-4 w-[100%] rounded-xl hover:bg-sky-600 flex items-center gap-5 ${isActive && "hover: bg-sky-700"}`
                }}><IoAlbums ></IoAlbums>Add Albums</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default AdminSidebar