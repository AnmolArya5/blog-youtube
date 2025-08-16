import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

const SignUp = () => {
  const [formData, setFormData] = useState ({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadind, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = ( e ) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };  
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.username || !formData.email || !formData.password) {
    return setErrorMessage('Fill out all the fields.');
  }
  try {
    setLoading(true);
    setErrorMessage(null);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);
   
    if (data.success === false) {
      return setErrorMessage(data.message);
    }
    setLoading(false);
    if(res.ok) {
      navigate('/sign-in');
    }
  } catch (error) {
    setErrorMessage(error.message);
    setLoading(false);
  }
    // ✅ success handling here
    alert('Signup successful!');
};

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
           <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
             <div>
               <Label htmlFor="Your Username">Your Username</Label>
               <TextInput id="username" type="text" placeholder="Your Username" onChange={handleChange}/>
             </div>
             <div>
               <Label htmlFor="Your Email">Your Email</Label>
               <TextInput id="email" type="email" placeholder="Your Email" onChange={handleChange}/>
             </div>
             <div>
               <Label htmlFor="Your Password">Your Password</Label>
               <TextInput id="password" type="password" placeholder="Your Password" onChange={handleChange}/>
             </div>
             <Button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800" type='submit' disabled={loadind}>
               { loadind ? (
                <>
                <Spinner size='sm'/>
                <span className='pl-3'>Loading...</span>
                </>
               ) : 'sign Up'
              }
             </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an Account?</span>
              <Link to='/sign-in' className='text-blue-500'>SignIn</Link>

            </div>
             {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
             )}
        </div>
      </div>
    </div>
  )
}

export default SignUp
