import React, { useState } from 'react'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { __AUTH } from '../Backend/FirebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../Helper Components/Spinner';

const Register = () => {
    let [togglePassword,setTogglePassword]=useState(false)
    let [toggleConfirmPassword, setToggleConfirmPassword]=useState(false)
    let navigate = useNavigate()
    let [isLoading, setIsLoading] = useState(false)

    let[data,setData] = useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    })

    let{username, email, password, confirmpassword} = data

    let handleData = (e)=>{
        let value = e.target.value
        let name = e.target.name
        setData({...data,[name]:value})
    }

    let handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            setIsLoading(true)
            if(password !== confirmpassword){
             toast.error("Passwords don't match!")  
             setData({...data, confirmpassword:""}) 
            }
            else{
               let obj = await createUserWithEmailAndPassword(__AUTH, email, password)
               let {user} = obj
               console.log(user);
               await updateProfile(user,{
                displayName:username,
                photoURL:"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
               })
               sendEmailVerification(user)
               toast("Verification link sent to: " + user)
               toast.success("User Registered!")
               navigate("/auth/login")
            }
        }
        catch (error){
            console.log(error.message)
            toast.error("Error: " + error.message.slice(22,error.message.length-2) + "!")
        }
        finally{
            setIsLoading(false)
        }
    }

  return (
    <section className="h-[calc(100vh-65px)] w-[100%] bg-slate-900 flex items-center justify-center">
        <div className='w-[30%] bg-slate-700 p-5 rounded-2xl border border-dashed'>
            <header>
                <h1 className='text-center text-3xl font-semibold'>Register Page</h1>
            </header>
            <main>
                <form action="" className="flex flex-col gap-4 m-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className='block p-2'>Username: </label>
                        <input type="text" id="username" className='border-1 w-[100%] rounded-md px-2 h-10' placeholder='Enter Username' onChange={handleData} name="username" value={username}/>
                    </div>
                    <div>
                        <label htmlFor="email" className='block p-2'>Email: </label>
                        <input type="email" id="email" className='border-1 w-[100%] rounded-md px-2 h-10' placeholder='Enter Email' onChange={handleData} name="email" value={email}/>
                    </div>
                    <div className='relative'>
                        <label htmlFor="password" className='block p-2'>Password: </label>
                        <input type={togglePassword?"text":"password"} id="password" className='border-1 w-[100%] rounded-md px-2 h-10' placeholder='Enter Password' onChange={handleData} name="password" value={password}/>
                        {togglePassword ? (
                        <FaEye className='absolute bottom-3 right-3' onClick={(() => setTogglePassword(!togglePassword))}/>):
                        (<FaEyeSlash className='absolute bottom-3 right-3' onClick={(()=> setTogglePassword(!togglePassword))}/>)}
                    </div>
                    <div className='relative'>
                        <label htmlFor="confpwd" className="block p-2">Confirm Password: </label>
                        <input type="password" id="confpwd" className='border-1 w-[100%] rounded-md px-2 h-10' placeholder='Confirm Previously Entered Password' onChange={handleData} name="confirmpassword" value={confirmpassword}/>
                        {toggleConfirmPassword ? 
                        <FaEye className='absolute bottom-3 right-3' onClick={(() => setToggleConfirmPassword(!toggleConfirmPassword))}/>:
                        <FaEyeSlash className='absolute bottom-3 right-3' onClick={(()=> setToggleConfirmPassword(!toggleConfirmPassword))}/>}
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-blue-400 w-[100%] mt-2 py-1 border-1 border-dotted rounded-2xl cursor-pointer">Register!</button>
                    </div>
                    <div className='mt-5 text-center'>
                        <h3>Already have an account?</h3>
                        <NavLink to="/auth/login" className="hover:text-blue-600 hover:underline">Click here to Login!</NavLink>
                    </div>
                </form>
            </main>
        </div>
    {isLoading && <Spinner/>}
    </section>
  )
}

export default Register