import { Button, TextInput } from 'flowbite-react'
import React from 'react'
// import { useSelector } from 'react-router-dom'

export default function Dashprofile() {
  // const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
       <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
       <form className='flex flex-col gap-4'>
         <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          {/* <img src={currentUser.profilePicture} alt='user'/> */}
          <img src='' alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
         </div>
         <TextInput type='username' id='username' placeholder='username' />
         <TextInput type='email' id='email' placeholder='email' />
         <TextInput type='pasword' id='pasword' placeholder='pasword' />


         <Button type='submit' className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800" outline>
          Update
         </Button>
       </form>
       <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
       </div>
    </div>
  )
}
