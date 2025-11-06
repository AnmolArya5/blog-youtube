import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user)
    const [ userPosts, setUserPosts ] = useState([])
    console.log(userPosts);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()
                if (res.ok) {
                    setUserPosts(data.posts)
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadhow-md'>
            <TableHead>
                <TableHeadCell>Date Updated</TableHeadCell>
                <TableHeadCell>Post Image</TableHeadCell>
                <TableHeadCell>Post Title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
                <TableHeadCell><span>Edit</span></TableHeadCell>
            </TableHead>
            {userPosts.map((post) => (
                <TableBody className='divide-y'>
                    <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <TableCell>
                            {new Date(post.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            <Link to={`/post/${post.slug}`}>
                              <img 
                              src={post.image}
                              alt={post.title}
                              className='w-20 h-10 object-cover bg-gray-500'    
                              />
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>
                            <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                        </TableCell>
                        <TableCell>
                            <Link className='text-teal-500 hover:underline' to={`update-post/${post._id}`}></Link>
                            <span>Edit</span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            ))}
          </Table>
        </>
      ):(
        <p>you have no post yet</p>
      )}
    </div>
  )
}



// pursne vala
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// export default function DashPosts() {
//     const { currentUser } = useSelector(state => state.user);
//     const [userPosts, setUserPosts] = useState([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 // Admin sees all posts, normal user sees only their own
//                 const url = currentUser?.isAdmin
//                     ? '/api/post/getposts'
//                     : `/api/post/getposts?userId=${currentUser._id}`;

//                 const res = await fetch(url);
//                 const data = await res.json();

//                 if (res.ok) {
//                     setUserPosts(data.posts);
//                 } else {
//                     console.error(data.message);
//                 }
//             } catch (error) {
//                 console.error(error.message);
//             }
//         };

//         if (currentUser?._id) fetchPosts();
//     }, [currentUser]);

//     return (
//         <div className="p-4 max-w-4xl mx-auto">
//             <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
//             {userPosts.length === 0 ? (
//                 <p>No posts found.</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {userPosts.map(post => (
//                         <div key={post._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
//                             {post.image && (
//                                 <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded mb-2" />
//                             )}
//                             <h3 className="text-xl font-semibold">{post.title}</h3>
//                             <p className="text-gray-500 text-sm mb-1">Category: {post.category || 'Uncategorized'}</p>
//                             <p className="text-gray-400 text-xs">Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

