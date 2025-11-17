import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
  const { slug } = useParams(); // 👈 get slug from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${slug}`);
        setPost(res.data);
      } catch (error) {
        console.error('Failed to load post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt={post.title} />}
      <p><i>Published on: {new Date(post.createdAt).toLocaleDateString()}</i></p>
    </div>
  );
};

export default PostPage;
