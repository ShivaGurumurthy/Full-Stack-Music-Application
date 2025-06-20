import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../Context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { __DB } from '../../Backend/FirebaseConfig'
import Spinner from '../../Helper Components/Spinner'
import { useNavigate } from 'react-router-dom'
import { UserContextAPI } from '../../Context/UserContext'

const UpdateProfile = () => {
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  let {authUser} = useContext(AuthContextAPI)
  let {userProfile} = useContext(UserContextAPI)
  let [data, setData] = useState({
    phone: userProfile?.phoneNo,
    dob: userProfile?.dateOfBirth,
    lang: userProfile?.languages,
    gender: userProfile?.gender,
    address: userProfile?.address
  })
  let {phone, dob, lang, gender, address} = data

  let handleChange = (e)=>{
    let key = e.target.name
    let value = e.target.value
    setData({...data, [key]:value})
  }

  let handleSubmit = async (e)=>{
    e.preventDefault()
    let {displayName, email, photoURL, uid} = authUser 
    let payload={
      //key : value
      name:displayName,
      email:email,
      photo:photoURL,
      id:uid,
      phoneNo:phone,
      dateOfBirth:dob,
      gender:gender,
      languages:lang,
      address:address,
      role:"user"
    }
    try{
      setIsLoading(true)
      console.log(payload)
     let user_collection =  doc(__DB, "user-profile", uid)
     await setDoc(user_collection, payload)
     toast.success("Details added successfully!")
     navigate("/user-profile")
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
    <div className='min-h-[400px] w-[60%] bg-slate-700 rounded-2xl p-7 flex flex-col gap-10'>
    <h2 className='text-center text-3xl'>Upload Profile Information</h2>
    <form action="" className='mt-8 flex flex-col gap-15 m-20' onSubmit={handleSubmit}>
      <section className='flex gap-10 w-full'>
      <div className='flex flex-col gap-2 w-[48%]'>
        <label htmlFor="phone" className='block text-[18px]'>Phone Number:</label>
        <input type="tel" id="phone" placeholder='Enter Phone Number' name="phone" value={phone} className='outline-none bg-white py-2 px-4 rounded-lg text-black'onChange={handleChange}/>
      </div>
      <div className='flex flex-col gap-2 w-[48%]'>
        <label htmlFor="dob" className='block text-[18px]'>Date Of Birth:</label>
        <input type="date" id="dob" name="dob" value={dob} className='outline-none bg-white py-2 px-4 rounded-lg text-black'onChange={handleChange}/>
      </div>
    </section>
    <section className='flex gap-10 w-full'>
      <div className='flex flex-col gap-2 w-[48%]'>
        <label htmlFor="lang" className='block text-[18px]'>Language:</label>
        <input type="text" id="lang" placeholder='Enter Languages' name='lang' value={lang} className='outline-none bg-white py-2 px-4 rounded-lg text-black'onChange={handleChange}/>
      </div>
      <div className='flex flex-col gap-2 w-[48%]'>
        <label className='block text-[18px]'>Gender:</label>
        <div className='flex gap-8 text-xl mt-3 ml-4'>
        <input type="radio" name="gender" value="Male" checked={gender==="Male"} onChange={handleChange}/><span>Male</span>
        <input type="radio" name="gender" value="Female" checked={gender==="Female"} onChange={handleChange}/><span>Female</span>
        <input type="radio" name="gender" value="Others"  checked={gender==="Others"} onChange={handleChange}/><span>Others</span>
        </div>
      </div>
    </section>
      <div className='flex flex-col gap-2 '>
        <label htmlFor="address" className='block text-[18px]'>Address: </label>
        <textarea id="address" placeholder='Enter Address' onChange={handleChange} name="address" value={address} className='outline-none bg-white py-2 px-4 rounded-lg text-black'></textarea>
      </div>
      <button className='bg-gray-500 p-5 text-2xl rounded-xl cursor-pointer font-semibold border-1 border-dashed hover:bg-gray-800'>Submit</button>
    </form>
    </div>
    {isLoading && <Spinner/>}
   </section>
  )
}

export default UpdateProfile