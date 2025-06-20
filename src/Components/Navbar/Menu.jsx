import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContextAPI } from "../../Context/AuthContext";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { __AUTH } from "../../Backend/FirebaseConfig";
import { UserContextAPI } from "../../Context/UserContext";
import Spinner from "../../Helper Components/Spinner";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

const Menu = () => {
  let {authUser} = useContext(AuthContextAPI)
  let {userProfile,isLoading}=useContext(UserContextAPI)
  let navigate = useNavigate()
  const logout= async ()=>{
    try{
    await signOut(__AUTH)
    toast.success("Logged Out!")
    navigate("/auth/login")
    }
    catch(error){
      toast.error(error.message)
    }
  }
  return (
    <aside>
      <ul className="flex gap-10 font-semibold items-center ">
      {userProfile?.role === "admin" && authUser &&(
        <li >
          <NavLink 
            to="/admin"
            className={(obj) => {
              let { isActive } = obj;
              return `px-2 py-3 rounded-lg cursor-pointer hover:bg-blue-700 flex gap-2 items-center  ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
          <MdOutlineAdminPanelSettings />Admin
          </NavLink>
        </li>)}
        <li>
          <NavLink
            to="/"
            className={(obj) => {
              let { isActive } = obj;
              return `px-2 py-3 rounded-lg cursor-pointer hover:bg-blue-700 flex gap-2 items-center ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
          <FaHome />Home
          </NavLink>
        </li>
       
        {authUser ?  <>
        <li>
          <button
              className="px-2 py-3 rounded-lg cursor-pointer hover:bg-blue-700 flex gap-2 items-center"
          onClick={logout}>
          <TbLogout />Logout
          </button>
        </li>
        <li>
          <NavLink to="/user-profile">
            <img src={authUser.photoURL} alt="" className="h-[30px] w-[30px] rounded-full"/>
          </NavLink>
        </li>
         </>: <>

          <li>
          <NavLink
            to="auth/login"
            className={(obj) => {
              let { isActive } = obj;
              return `px-2 py-3 rounded-lg cursor-pointer hover:bg-blue-700 ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="auth/register"
            className={(obj) => {
              let { isActive } = obj;
              return `px-2 py-3 rounded-lg cursor-pointer hover:bg-blue-700 ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            Register
          </NavLink>
        </li>
        </>}
        
      </ul>
      {isLoading && <Spinner/>}
    </aside>
  );
};

export default Menu;
