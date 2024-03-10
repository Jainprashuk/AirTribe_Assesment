'use client'
import React from 'react'
import Image from 'next/image'
import { MagnifyingGlassCircleIcon , UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from "react-avatar"

function Header() {
  return (
    <div className=' '>
        <div className='flex flex-col md:flex-row items-center p-5  rounded-b-2xl border-b-2 border-gray-300 '>
        {/* <Image
        src="https://media.licdn.com/dms/image/D561BAQGKJ41ZxZ-dIQ/company-background_10000/0/1659857510881/airtribe_cover?e=2147483647&v=beta&t=xRTTJMa0aWNtsG526ME7sZ2sVGjiOnJf8lQJi2_btl0"
        alt='logo image'
        width={300}
        height={100}
        className='w-44 md:w-56 pb-10 md:pb-0 object-contain rounded-full border-gray-700 border-2'
        /> */}
        <h1 className='text-3xl  bg-gradient-to-r from-indigo-900 to-fuchsia-900 bg-clip-text text-transparent font-bold'>Airtribe</h1>

        <div className='flex items-center space-x-5 flex-1 justify-end w-full text-black'>
            <form action="" className='flex items-center space-x-5 rounded-md p-1 shadow-md bg-white flex-1 md:flex-initial'>
                <MagnifyingGlassCircleIcon className='h-6 w-6 text-gray-400'/>
                <input type="text" placeholder='Search' className='flex-1 outline-none  p-2 text-gray-900' />
                <button type="submit" hidden>Search</button>
            </form>

            <Avatar className='border-2 border-white' name="prashuk" round size='50' color='gray'  />
            {/* <div className='p-3 px-3 rounded-3xl border-white border-2 font-bold text-white bg-black'>PJ</div> */}
        </div>
        </div>

        <div className='flex items-center justify-center px-5 mt-4 md:py-2'>
            <p className='flex p-2 items-center text-sm font-light   shadow-xl rounded-xl w-fit bg-gray-100 italic max-w-3xl text-black font-medium'>
                {/* <UserCircleIcon className='inline-block w-10 h-10 mr-1 text-gray-950'/> */}
                Manage Your Tasks At Your Fingertips
            </p>
        </div>
    </div>

    
  )
}

export default Header