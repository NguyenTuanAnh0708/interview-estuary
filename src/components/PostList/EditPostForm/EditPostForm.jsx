import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import './EditPostForm.css';

function EditPostForm({ post, onUpdate, onCancel }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(post.id, { title, content });
        onCancel();
    };

    return (
        <Form.Root className="edit-form" onSubmit={handleSubmit}>
            <Form.Field className="edit-form-field" name="title">
                <Form.Label className="edit-form-label">Title</Form.Label>
                <Form.Control asChild>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="edit-form-input"
                        required
                        placeholder="Edit post title"
                    />
                </Form.Control>
            </Form.Field>

            <Form.Field className="edit-form-field" name="content">
                <Form.Label className="edit-form-label">Content</Form.Label>
                <Form.Control asChild>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="edit-form-textarea"
                        required
                        placeholder="Edit post content"
                        rows="3"
                    />
                </Form.Control>
            </Form.Field>

            <div className="edit-form-buttons">
                <Form.Submit asChild>
                    <button className="edit-form-submit" type="submit">
                        Save
                    </button>
                </Form.Submit>
                <button className="edit-form-cancel" type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </Form.Root>
    );
}

export default EditPostForm;
