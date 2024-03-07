'use client'
import React from 'react'
import Image from 'next/image'
import { MagnifyingGlassCircleIcon , UserCircleIcon } from '@heroicons/react/16/solid'
import Avatar from "react-avatar"

function Header() {
  return (
    <div className=' '>
        <div className='flex flex-col md:flex-row items-center p-5  rounded-b-2xl border-b-2 '>
        {/* <Image
        src="https://media.licdn.com/dms/image/D561BAQGKJ41ZxZ-dIQ/company-background_10000/0/1659857510881/airtribe_cover?e=2147483647&v=beta&t=xRTTJMa0aWNtsG526ME7sZ2sVGjiOnJf8lQJi2_btl0"
        alt='logo image'
        width={300}
        height={100}
        className='w-44 md:w-56 pb-10 md:pb-0 object-contain rounded-full border-gray-700 border-2'
        /> */}
        <h1 className='text-3xl text-yellow-400 font-bold'>Airtribe</h1>

        <div className='flex items-center space-x-5 flex-1 justify-end w-full text-black'>
            <form action="" className='flex items-center space-x-5 rounded-md p-1 shadow-md bg-white flex-1 md:flex-initial'>
                <MagnifyingGlassCircleIcon className='h-6 w-6 text-gray-400'/>
                <input type="text" placeholder='Search' className='flex-1 outline-none  p-2 text-gray-900' />
                <button type="submit" hidden>Search</button>
            </form>

            <Avatar name="prashuk" round size='50' color='gray' />
        </div>
        </div>

        <div className='flex items-center justify-center px-5 md:py-5'>
            <p className='flex p-1 items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-gray-950'>
                <UserCircleIcon className='inline-block w-10 h-10 mr-1 text-gray-950'/>
                Just To summarize your day
            </p>
        </div>
    </div>

    
  )
}

export default Header