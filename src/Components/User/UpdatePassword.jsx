import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { sendPasswordResetEmail } from 'firebase/auth'
import Spinner from '../../Helper Components/Spinner'
import { __AUTH } from '../../Backend/FirebaseConfig'


const UpdatePassword = () => {
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
      <section className="h-[calc(100vh-65px)] w-[100%] bg-sky-600 flex items-center justify-center">
      <div className='w-[30%] bg-slate-600 p-5 rounded-2xl border border-dashed'>
          <header>
              <h1 className='text-center text-3xl font-semibold m-3'>Update Password</h1>
          </header>
          <main>
              <form action="" className="flex flex-col gap-4 m-7 text-2xl" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="email" className='block p-2'>Email: </label>
                      <input type="email" id="email" className='border-1 w-[100%] rounded-md px-2 h-10' placeholder='Enter Email' onChange={handleData} name="email" value={email}/>
                  </div>
                  <div className="flex justify-center">
                      <button className="bg-[#008CBA] w-[100%] mt-2 py-1 border-1 border-dotted rounded-2xl cursor-pointer hover:bg-blue-600">Update Password!</button>
                  </div>
                  <div className='mt-5 text-center'>
                      <NavLink to="/auth/login" className="hover:text-black hover:underline block w-full bg-gray-300 font-semibold hover:bg-gray-200 rounded-3xl p-2 border-1 border-dotted cursor-pointer">Cancel!!</NavLink>
                  </div>
              </form>
          </main>
      </div>
  {isLoading && <Spinner/>}
  </section>
  )
}

export default UpdatePassword