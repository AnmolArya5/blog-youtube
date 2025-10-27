import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
    <form className='flex flex-col gap-4'>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
            <Select>
                <option value='uncategorized'>Select a Category</option>
                <option value='update'>Update</option>
                <option value='News'>News</option>
                <option value='Drama'>Drama</option>
                <option value='technology'>technology</option>
            </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 vorder-teal-500 border-dotted p-3">
            <FileInput type='file' accept='image/*' />
            <Button type='button' className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800" size='lg' outline>
                Upload Image
            </Button>
        </div>
        <ReactQuill them='snow' placeholder='Write SomeThing.....' className='h-72 mb-12' required />
         <Button type='submit' className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800" size='lg' outline>Publish</Button>
        </form>  
    </div>
  )
}
