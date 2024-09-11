import React, { useState } from 'react';
import EditPostForm from './EditPostForm/EditPostForm';
import './PostList.css';
import CommentList from './CommentList/CommentList';

function PostList({ posts, onDeletePost, onUpdatePost }) {
    const [editingPostId, setEditingPostId] = useState(null);

    const handleEdit = (id) => {
        setEditingPostId(id);
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };

    const handleUpdatePost = async (id, updatedContent) => {
        await onUpdatePost(id, updatedContent);
        setEditingPostId(null);
    };

    return (
        <div className="post-list">
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="post">
                        {editingPostId === post.id ? (
                            <EditPostForm
                                post={post}
                                onUpdate={handleUpdatePost}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <>
                                <h2 className="post-title">{post.title}</h2>
                                <p className="post-content">{post.content}</p>
                                <div className="post-buttons">
                                    <button
                                        onClick={() => onDeletePost(post.id)}
                                        className="post-delete"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEdit(post.id)}
                                        className="post-update"
                                    >
                                        Update
                                    </button>
                                </div>
                            </>
                        )}

                        <CommentList postId={post.id} />
                    </div>
                ))
            )}
        </div>
    );
}

export default PostList;
