import Image from 'next/image'
import React from 'react'
import Switcher from './switcher'

const Navbar = () => {
  return (
    <div className='h-[90px] px-4 flex items-center justify-between w-full shadow-lg border-b bg-white dark:bg-gray-900'>
        <div>
        <Image src="/logo.png" alt="logo" width={60} height={60} className="mx-auto dark:invert"/>
        </div>
         <Switcher/>
    </div>
  )
}

export default Navbar