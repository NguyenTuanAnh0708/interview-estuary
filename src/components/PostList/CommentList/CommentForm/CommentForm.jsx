import React, { useState, useEffect } from 'react';
import * as Form from '@radix-ui/react-form';
import './CommentForm.css';

function CommentForm({
    onSaveComment,
    onUpdateComment,
    editingComment,
    setEditingComment,
}) {
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        if (editingComment) {
            setCommentText(editingComment.text);
        }
    }, [editingComment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        if (editingComment) {
            await onUpdateComment(editingComment.id, commentText);
            setEditingComment(null);
        } else {
            await onSaveComment(commentText);
        }
        setCommentText(''); // Clear input after saving
    };

    const handleCancel = () => {
        setEditingComment(null);
        setCommentText('');
    };

    return (
        <Form.Root className="comment-form" onSubmit={handleSubmit}>
            <Form.Field name="commentText">
                <Form.Label className="form-label">Comment</Form.Label>
                <Form.Control asChild>
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="comment-input"
                        placeholder="Add or edit a comment"
                        required
                    />
                </Form.Control>
                <Form.Message className="form-message" match="valueMissing">
                    Comment cannot be empty.
                </Form.Message>
            </Form.Field>
            <div className="form-buttons">
                <Form.Submit asChild>
                    <button className="form-submit">
                        {editingComment ? 'Update Comment' : 'Add Comment'}
                    </button>
                </Form.Submit>
                {editingComment && (
                    <button type="button" className="form-cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </Form.Root>
    );
}

export default CommentForm;
