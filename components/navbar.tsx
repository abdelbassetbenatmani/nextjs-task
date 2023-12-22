import Image from 'next/image'
import React from 'react'
import Switcher from './switcher'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='h-[90px] px-4 flex items-center justify-between w-full shadow-lg border-b bg-white dark:bg-gray-900'>
        <div>
        <Link href="/">
        <Image src="/logo.png" alt="logo" width={60} height={60} className="mx-auto dark:invert"/>
        </Link>
        </div>
         <Switcher/>
    </div>
  )
}

export default Navbar