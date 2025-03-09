"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "../actions"; // Import the server action from actions.js
import "@/styles/newPost.css"; // Import the CSS file

export default function NewPostPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        image: "",
        caption: ""
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await createPost(formData); // Call the server action from action.js
        router.push("/posts"); // Redirect to posts page
    }

    return (
        <div className="new-post-container">
            <h1 className="new-post-title">Create a New Post</h1>
            <form className="new-post-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    className="new-post-input"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="author"
                    className="new-post-input"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    className="new-post-input"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="caption"
                    className="new-post-textarea"
                    placeholder="Caption"
                    value={formData.caption}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="new-post-submit">Submit</button>
            </form>
        </div>
    );
}

