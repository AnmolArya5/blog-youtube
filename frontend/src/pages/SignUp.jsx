import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Label, TextInput } from 'flowbite-react';

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left div */}
        <div className="flex-1">
          <Link to="/" className='font-bold dark:text-white text-4xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >AA</span> Blog
          </Link>
          <p className='text-sm mt-5'>Welcome to the family — sign up with your email or Google.</p>
        </div>
        {/* right div */}
        <div className="flex-1">
           <form className='flex flex-col gap-4'>
             <div>
               <Label htmlFor="Your Username">Your Username</Label>
               <TextInput id="username" type="text" placeholder="Your Username"/>
             </div>
             <div>
               <Label htmlFor="Your Email">Your Email</Label>
               <TextInput id="email" type="text" placeholder="Your Email"/>
             </div>
             <div>
               <Label htmlFor="Your Password">Your Password</Label>
               <TextInput id="password" type="password" placeholder="Your Password"/>
             </div>
             <Button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800" type='submit'>
               signin
             </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an Account?</span>
              <Link to='/sign-in' className='text-blue-500'>SignIn</Link>

            </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp
