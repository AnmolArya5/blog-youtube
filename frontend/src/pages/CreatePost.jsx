import { useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert, Button, FileInput, Label, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'uncategorized',
    content: '',
    image: ''
  });

  const navigate = useNavigate();

  // ✅ Upload image to Cloudinary
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      setImageUploadError(null);
      setImageUploadProgress(0);

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', uploadPreset);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data,
        {
          onUploadProgress: (e) => {
            const progress = Math.round((e.loaded * 100) / e.total);
            setImageUploadProgress(progress);
          }
        }
      );

      setFormData({ ...formData, image: res.data.secure_url });
      setImageUploadProgress(null);
      setImageUploadError(null);
    } catch (err) {
      console.error(err);
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };

  // ✅ Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle editor content change
  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example POST to backend (adjust URL later)
      // const res = await axios.post('/api/posts', formData);
      // const createdPost = res.data;

      // For now, simulate slug from title:
      const slug = formData.title.toLowerCase().replace(/\s+/g, '-');

      console.log('Post Created:', { ...formData, slug });

      // Navigate to the new post page
      navigate(`/post/${slug}`);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Title and Category */}
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
            className='flex-1'
          />
          <Select
            name='category'
            value={formData.category}
            onChange={handleChange}
          >
            <option value='uncategorized'>Select a Category</option>
            <option value='update'>Update</option>
            <option value='News'>News</option>
            <option value='Drama'>Drama</option>
            <option value='technology'>Technology</option>
          </Select>
        </div>

        {/* Image Upload */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <div>
            <Label className='mb-2 block' htmlFor='file-upload'>
              Upload file
            </Label>
            <FileInput
              id='file-upload'
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <Button
            type='button'
            className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800'
            size='lg'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}

        {formData.image && (
          <img
            src={formData.image}
            alt='uploaded'
            className='w-full h-72 object-cover'
          />
        )}

        {/* Content */}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          value={formData.content}
          onChange={handleContentChange}
          className='h-72 mb-12'
          required
        />

        {/* Publish Button */}
        <Button
          type='submit'
          className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800'
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
