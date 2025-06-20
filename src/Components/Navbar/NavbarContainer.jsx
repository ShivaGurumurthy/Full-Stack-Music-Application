import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const NavbarContainer = () => {
  return (
    <header className='h-[65px] w-[100%] sticky top-0 bg-slate-700 shadow-xl-z-10 shadow-white '>
        <article className='w-[95%] m-auto h-[100%] flex items-center justify-between'>
            <Logo/>
            <Menu/>
        </article>
    </header>
  )
}

export default NavbarContainer