import React from 'react'
import UserAccount from './UserAccount'
import UpdateProfile from './UpdateProfile'
import { NavLink } from 'react-router-dom'
import { FaUserPen } from "react-icons/fa6";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { PiPasswordDuotone } from "react-icons/pi";
import { AiOutlineUsergroupDelete } from "react-icons/ai";

const UserSidebar = () => {
  return (
    <div className='h-[100%] w-[20%] bg-slate-600 px-4 py-8 shrink-0'>
        <ul className='text-4xl font-medium flex flex-col gap-15 m-5 cursor-pointer'>
            <li>
                <NavLink to="/user-profile" end className={(obj)=>{
                    let {isActive} = obj
                    return `py-3 px-4 w-[100%] rounded-xl hover:bg-sky-600 flex items-center gap-5 ${isActive && "hover: bg-sky-700"}`
                }}><BiSolidUserAccount />My Account</NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/update-picture" className={(obj)=>{
                    let {isActive} = obj
                    return `py-3 px-4 w-[100%] rounded-xl hover:bg-sky-600 flex items-center gap-5 ${isActive && "hover: bg-sky-700"}`
                }}><MdOutlinePhotoLibrary />Update Picture</NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/update-profile" className={(obj)=>{
                    let {isActive} = obj
                    return `py-3 px-4 w-[100%] rounded-xl hover:bg-sky-600 flex items-center gap-5 ${isActive && "hover: bg-sky-700"}`
                }}><FaUserPen />Update Profile</NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/update-password" className={(obj)=>{
                    let {isActive} = obj
                    return `py-3 px-4 w-[100%] rounded-xl hover:bg-sky-600 flex items-center gap-5 ${isActive && "hover: bg-sky-700"}`
                }}><PiPasswordDuotone />Update Password</NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/delete-account" className={(obj)=>{
                    let {isActive} = obj
                    return `py-3 px-4 w-[100%] rounded-xl hover:bg-red-500 flex items-center gap-5 text-white ${isActive && "hover: bg-red-700 text-white"}`
                }}><AiOutlineUsergroupDelete />Delete Account</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default UserSidebar