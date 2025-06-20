import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { __AUTH } from '../../Backend/FirebaseConfig';
import { AuthContextAPI } from '../../Context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Helper Components/Spinner';

const UpdatePicture = () => {
  let [picture, setPicture] = useState(null)
  let[preview, setPreview] = useState(null)
  let {authUser} = useContext(AuthContextAPI)
  let navigate = useNavigate()
  let [isLoading, setIsLoading] = useState(false)

  const handleChange = (e)=>{
    console.log(e)
    // console.dir(e.target.files[0])
    let file = e.target.files[0]
    setPicture(file)

    if(file){
      let url = URL.createObjectURL(file)
      console.log(url);
      setPreview(url)
      
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      setIsLoading(true)
      if(!picture){
        toast.error("Select a picture first!")
        return;
      }
      else{
        const data = new FormData()
        data.append("file",picture)
        data.append("upload_preset", "Innovators Hub Music")
        let response = await fetch("https://api.cloudinary.com/v1_1/dz4q4vx88/image/upload",{
          method:"POST",
          body:data
        })
        let result = await response.json()
        console.log(result);

        await updateProfile(authUser,{
          photoURL:result.url
        })
      
        toast.success("Photo successfully updated!")
        navigate("/user-profile")
      }
    }
    catch(error){
      toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  return (
   <section className='h-[100%] w-[100%] bg-sky-700 flex items-center justify-center'>
    <div className='min-h-[300px] w-[35%] bg-slate-700 rounded-2xl p-7 flex flex-col gap-10'>
      <h2 className='text-center text-3xl'>Upload Profile Picture</h2>
      <form action="" className='flex flex-col text-2xl gap-15' onSubmit={handleSubmit}>
        <div className='h-50 w-50 m-auto bg-gray-600 flex rounded-full'> 
        {preview ? <img src={preview} alt=""  className='h-full w-full rounded-full'/> : <div className='h-full w-full flex items-center justify-center'>No file chosen</div>}
        </div>
        <label htmlFor="pic" className='block p-5 rounded-xl border-2 border-dotted text-center w-[100%] cursor-pointer' accept="image/*">Select a picture</label>
        <input type="file" id="pic" className='hidden' onChange={handleChange}/>
        <button className='rounded-lg border-2 border-dashed p-3 w-full bg-blue-600 hover:bg-blue-800 cursor-pointer flex justify-center gap-8'><FaArrowUpFromBracket />Upload Photo</button>
      </form>
    </div>
    {isLoading && <Spinner/>}
   </section>
  )
}
export default UpdatePicture