import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import './PostForm.css';

function PostForm({ onAddPost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) return;
        onAddPost({ id: Date.now(), title, content });
        setTitle('');
        setContent('');
    };

    return (
        <Form.Root className="form" onSubmit={handleSubmit}>
            <Form.Field className="form-field" name="title">
                <Form.Label className="form-label">Title</Form.Label>
                <Form.Control asChild>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                        required
                        placeholder="Enter post title"
                    />
                </Form.Control>
            </Form.Field>

            <Form.Field className="form-field" name="content">
                <Form.Label className="form-label">Content</Form.Label>
                <Form.Control asChild>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-textarea"
                        required
                        placeholder="Enter post content"
                        rows="3"
                    />
                </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
                <button className="form-submit" type="submit">
                    Add Post
                </button>
            </Form.Submit>
        </Form.Root>
    );
}

export default PostForm;
