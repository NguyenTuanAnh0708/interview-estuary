// App.js
import React, { useEffect, useState } from 'react';
import PostForm from './components/PostForm/PostForm';
import PostList from './components/PostList/PostList';
import { getPosts, savePosts, updatePost, deletePost } from './api/api';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };

    fetchData();
  }, []);

  const addPost = async (newPost) => {
    const updatedPosts = [...posts, newPost];
    await savePosts(updatedPosts);
    setPosts(updatedPosts);
  };

  const deletePostHandler = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  const updatePostHandler = async (id, updatedContent) => {
    await updatePost(id, updatedContent);
    setPosts(posts.map((post) => (post.id === id ? { ...post, ...updatedContent } : post)));
  };

  return (
    <div className="container">
      <h1 className="title">Manage Posts</h1>
      <PostForm onAddPost={addPost} />
      {loading ? <p>Loading...</p> : <PostList posts={posts} onDeletePost={deletePostHandler} onUpdatePost={updatePostHandler} />}
    </div>
  );
}

export default App;
