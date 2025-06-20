import React, { useState } from 'react'
import Spinner from '../Helper Components/Spinner'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { sendPasswordResetEmail } from 'firebase/auth'
import { __AUTH } from '../Backend/FirebaseConfig'


const ForgotPassword = () => {
    let [email, setEmail] = useState("")
    let [isLoading, setIsLoading] = useState(false)
    let navigateTo = useNavigate()

    let handleData=(e)=>{
        setEmail(e.target.value)
    }
    let handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            setIsLoading(true)
          await sendPasswordResetEmail(__AUTH, email)
          toast.success("Check your mail to reset password!")
          navigateTo("/auth/login")

        }
        catch(error){
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
            <h1 className='text-center text-3xl font-semibold m-3'>Reset Password</h1>
        </header>
        <main>
            <form action="" className="flex flex-col gap-4 m-7" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className='block p-2'>Email: </label>
                    <input type="email" id="email" className='border-1 w-[100%] rounded-md px-2 h-10' placeholder='Enter Email' onChange={handleData} name="email" value={email}/>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-400 w-[100%] mt-2 py-1 border-1 border-dotted rounded-2xl cursor-pointer hover:bg-blue-600">Reset Password!</button>
                </div>
                <div className='mt-5 text-center'>
                    <NavLink to="/auth/login" className="hover:text-black hover:underline block w-full bg-rose-600 hover:bg-rose-400 rounded-3xl p-2 border-1 border-dotted cursor-pointer">Cancel!!</NavLink>
                </div>
            </form>
        </main>
    </div>
{isLoading && <Spinner/>}
</section>
  )
}

export default ForgotPassword