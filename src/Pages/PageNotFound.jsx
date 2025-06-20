import React from 'react'
import { NavLink } from 'react-router-dom'


const PageNotFound = () => {
  return (
    <>
      <div className='bg-gray-800 h-[100vh] w-[100vw] flex flex-col justify-center items-center'>
        <div className='h-[500px] w-[700px] bg-black flex flex-col justify-center items-center rounded-[80%] border-3 border-dotted border-white relative'>
          <section className='text-[65px] text-sky-900 animate-pulse hover:animate-ping hover:cursor-pointer hover:text-white'>
            <h1>404!</h1>
          </section>
          <section className='text-2xl'>
            <h1 className='text-gray-300'>Looks like you've headed West instead of East! 🧭 (Page Not Found!)</h1>
          </section>
          <section className='p-5'>
            <h1 className='text-2xl underline decoration-gray-300 decoration-wavy border-1 border-dashed p-4 rounded-xl'>
              <i>Psst... Click the below button before you fall into the mighty black hole of darknesss!</i>
            </h1>
          </section>
          <div>
            <NavLink to="/">
              <button className='m-8 p-10 bg-gray-600 text-gray-900 hover:bg-black-100 rounded-4xl border-2 border-white border-dotted hover:border-sky-500 hover:text-white cursor-pointer hover:underline hover:decoration-dotted animate-bounce'>
                Click to "Zoom" back East (Home!)
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageNotFound