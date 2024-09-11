import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm/CommentForm';
import './CommentList.css';
import { getComments, saveComments, updateComment, deleteComment } from '../../../api/api';

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            const fetchedComments = await getComments(postId);
            setComments(fetchedComments || []);
        };
        fetchComments();
    }, [postId]);

    const handleSaveComment = async (text) => {
        const newComment = { id: Date.now(), text };
        const updatedComments = [...comments, newComment];
        await saveComments(postId, updatedComments);
        setComments(updatedComments);
    };

    const handleUpdateComment = async (id, updatedText) => {
        await updateComment(postId, id, updatedText);
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id ? { ...comment, text: updatedText } : comment
            )
        );
    };

    // Delete a comment
    const handleDeleteComment = async (id) => {
        await deleteComment(postId, id);
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    };

    return (
        <div className="comment-list">
            <h3>Comments</h3>
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <p className="comment-content">{comment.text}</p>
                    <div className="comment-buttons">
                        <button
                            onClick={() => setEditingComment(comment)}
                            className="comment-edit"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="comment-delete"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            <CommentForm
                postId={postId}
                onSaveComment={handleSaveComment}
                onUpdateComment={handleUpdateComment}
                editingComment={editingComment}
                setEditingComment={setEditingComment}
            />
        </div>
    );
}

export default CommentList;
