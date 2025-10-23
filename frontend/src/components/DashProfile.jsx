import { Alert, Button, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from '../redux/user/userSlice';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // ✅ Handle change for username, email, password
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }

    try {
      dispatch(updateStart());

      // ✅ Get JWT token stored during login
      const token = localStorage.getItem('token');

      const res = await fetch(
        `http://localhost:5000/api/user/update/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ include auth header
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* ✅ Static Profile Image */}
        <div className="relative w-32 h-32 self-center shadow-md overflow-hidden rounded-full">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        {/* ✅ User Info Inputs */}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {/* ✅ Update Button */}
        <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800" outline>
          Update
        </Button>
      </form>

      {/* ✅ Delete & Sign Out (Not functional yet) */}
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>

      {/* ✅ Success/Error Alerts */}
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
    </div>
  );
}





//  import { Button, TextInput } from 'flowbite-react'
//  import React from 'react'
//  export default function Dashprofile() {
//   return (
//     <div className='max-w-lg mx-auto p-3 w-full'>
//        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
//        <form className='flex flex-col gap-4'>
//          <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          
//           <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'  alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/> 
//          </div>
//          <TextInput type='username' id='username' placeholder='username' />
//          <TextInput type='email' id='email' placeholder='email' />
//          <TextInput type='password' id='password' placeholder='password' />


//          <Button type='submit' className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800" outline>
//           Update
//          </Button>
//        </form>
//        <div className='text-red-500 flex justify-between mt-5'>
//         <span className='cursor-pointer'>Delete Account</span>
//         <span className='cursor-pointer'>Sign Out</span>
//        </div>
//     </div>
//   )
// }
