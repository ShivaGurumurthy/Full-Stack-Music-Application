import React, { useContext, useState } from 'react'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { NavLink,useNavigate } from 'react-router-dom';
import Spinner from '../Helper Components/Spinner';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { __AUTH } from '../Backend/FirebaseConfig';
import { AuthContextAPI } from '../Context/AuthContext';

const Login = () => {

   let [togglePassword,setTogglePassword]=useState(false)

   let [isLoading, setIsLoading] = useState(false)
   let navigate = useNavigate()
   let {setAuthUser} = useContext(AuthContextAPI)

  let [data,setData] = useState({
    email:"",
    password:""
  })

  let {email,password} = data

  let handleData = (e)=>{
    let value = e.target.value
    let name = e.target.name
    setData({...data,[name]:value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      setIsLoading(true)
      let obj = await signInWithEmailAndPassword(__AUTH, email, password)
      // console.log(obj);
      let {user} = obj
      console.log(user);
      if(user.emailVerified === true){
        toast.success("Login Successful!")
        setAuthUser(user)
        navigate("/")
      }
      else{
        toast.error("Please verify your email and get back here!")
      }
    }
    catch (error){
      toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  
  }
  return (
    <section className="h-[calc(100vh-65px)] w-[100%] bg-slate-900 flex items-center justify-center">
    <div className='w-[30%] bg-slate-700 p-5 rounded-2xl border border-dashed'>
        <header>
            <h1 className='text-center text-3xl font-semibold'>Login Page</h1>
        </header>
        <main>
            <form action="" className="flex flex-col gap-4 m-3" onSubmit={handleSubmit}>
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
                <div className="flex justify-center">
                    <button className="bg-blue-400 w-[100%] mt-2 py-1 border-1 border-dotted rounded-2xl cursor-pointer">Login!</button>
                </div>
                <div className='mt-5 text-center'>
                    <h3 className='mt-2'>Don't have an account?</h3>
                    <NavLink to="/auth/register" className="hover:text-blue-600 hover:underline">Click here to Register!</NavLink>
                </div>
                <div className='mt-4 text-center'>
                <NavLink to="/auth/forgot-password" className="hover:text-blue-600 hover:underline ">Forgot Password?! 😓</NavLink>
                </div>
            </form>
        </main>
    </div>
{isLoading && <Spinner/>}
</section>
  )
}

export default Login 