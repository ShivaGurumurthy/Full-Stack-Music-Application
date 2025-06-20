import { deleteUser } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContextAPI } from "../../Context/AuthContext"
import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { __DB } from '../../Backend/FirebaseConfig'

const DeleteAccount = () => {
    let [text,setText]=useState("")
    let {authUser} = useContext(AuthContextAPI)
    let navigate=useNavigate()

    let handlechange=(e)=>{
        setText(e.target.value)
    }

    let handlesubmit=async(e)=>{
        e.preventDefault()
        try{
            if(text.toLowerCase().trim() === "delete account"){
                let user_collection=doc(__DB,"user-profile",authUser?.uid)
                await deleteUser(authUser)
                await deleteDoc(user_collection)
                toast.success("Account deleted Successfully")
                navigate("/auth/register")
            }
            else{
                toast.error("Invalid input")
            }
        }catch(error){
            toast.error(error.message)
        }
    }
  return (
    
    <section className='flex h-[100%] w-[100%] items-center justify-center'>
        <article className='min-h-[300px] w-[40%] bg-slate-900  rounded-xl p-4 ga'>
            <h2 className='text-center text-2xl'>Delete Account</h2>
            <form className='mt-6 flex flex-col gap-4' onSubmit={handlesubmit}>
                <div className='flex flex-col gap-2'>
                    <h3>Are you sure you want to delete the Account?</h3>
                    <h3>If yes, Enter delete account</h3>
                </div>
                <input type="text" placeholder='Delete Account' value={text} name='text' onChange={handlechange} className='outline-none w-full bg-white py-2 px-4 rounded-lg text-black' />
                <button className='py-2 px-4 bg-red-500 rounded-lg cursor-pointer hover:bg-red-700'>Delete Account</button>
            </form>
        </article>
    </section>
  )
}

export default DeleteAccount