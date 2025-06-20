import React, { useContext, useState } from 'react'
import { AuthContextAPI } from "../../Context/AuthContext"
import { NavLink } from 'react-router-dom'
import { UserContextAPI } from '../../Context/UserContext'
import Spinner from '../../Helper Components/Spinner'

const UserAccount = () => {
  let {authUser} = useContext(AuthContextAPI)
  let {userProfile,isLoading} = useContext(UserContextAPI)
  return (
    <section className='h-[100%] w-[100%] bg-sky-700 flex items-center justify-center'>
      <div className='min-h-[450px] w-[45%] bg-slate-700 rounded-2xl p-7 flex flex-col gap-5'>
        <header className='h-[120px] w-full bg-slate-600 rounded-t-xl flex items-center flex-col gap-2'>
          <img src={authUser?.photoURL} alt="" className='h-50 w-50 rounded-[50%] -mt-25'/>
          <h1 className='text-2xl'>{authUser?.displayName}</h1>
          <h1 className='text-2xl'>{authUser?.email}</h1>
          {/* <button className="bg-sky-600 p-2 rounded-xl" onClick={()=>authUser.photoURL="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"}>Remove Photo</button> */}
        </header>
        {userProfile ? <div className='flex flex-col gap-8 mt-5'>
          <h2 className='text-center text-4xl font-semibold'>Personal Information</h2>
          <article className='flex flex-wrap gap-10 text-2xl'>
          <div className='w-[48%] bg-sky-900 py-4 px-6 rounded-xl'>
            <h3 className='font-semibold'>Phone Number:</h3>
            <p>{userProfile?.phoneNo}</p>
          </div>
          <div className='w-[48%] bg-sky-900 py-4 px-6 rounded-xl'>
            <h3 className='font-semibold'>DOB:</h3>
            <p>{userProfile?.dateOfBirth}</p>
          </div>
          <div className='w-[48%] bg-sky-900 py-4 px-6 rounded-xl'>
            <h3 className='font-semibold'>Languages:</h3>
            <p>{userProfile?.languages}</p>
          </div>
          <div className='w-[48%] bg-sky-900 py-4 px-6 rounded-xl'>
            <h3 className='font-semibold'>Gender:</h3>
            <p>{userProfile?.gender}</p>
          </div>
          <div className='w-[100%] bg-sky-900 py-4 px-6 rounded-xl'>
            <h3 className='font-semibold'>Address:</h3>
            <p>{userProfile?.address}</p>
          </div>
          </article>
        </div>:
        <>
          <div className='h-[300px] w-full bg-slate-800 flex flex-col items-center justify-center gap-6 rounded-b-xl'>
          <h2 className='text-3xl text-center'>User data not found!<br/><br/>Click the button below to add data.</h2>
          <NavLink to="/user-profile/update-profile" className="bg-sky-600 p-5 rounded-xl text-xl">Add User Data</NavLink>
          </div>
        </>}
      </div>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default UserAccount