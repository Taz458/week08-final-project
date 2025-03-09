"use client"; // Ensure this is treated as a client component

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { getPostWithComments, addComment, deletePost } from "../actions"; // Import server actions
import "@/styles/postsPage.css"

export default function PostPage({ params }) {
    const { id } = React.use(params); // Extract the ID from params
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const router = useRouter();

    // Fetch post data from the server (useEffect to trigger on mount)
    useEffect(() => {
        const fetchPost = async () => {
            const fetchedPost = await getPostWithComments(id); // Get post data with comments
            setPost(fetchedPost); // Set the fetched post data to state
        };

        fetchPost(); // Fetch post data
    }, [id]); // Re-fetch the post when ID changes

    // Handle changes to the comment input field
    const handleCommentChange = (e) => {
        setComment(e.target.value); // Update comment state
    };

    // Handle adding a comment
    const handleAddComment = async (e) => {
        e.preventDefault(); // Prevent form default behavior (page reload)
        const newComment = await addComment(id, comment); // Add new comment to the server
        setPost(prevPost => ({
            ...prevPost,
            comments: [...prevPost.comments, newComment] // Append the new comment to the state
        }));
        setComment(""); // Clear the comment input field
    };

    // Handle post deletion
    const handleDeletePost = async () => {
        await deletePost(id); // Delete the post from the server
        router.push("/posts"); // Redirect to the posts list page
    };

    // Show loading text while the post is being fetched
    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-container">
            <h2>{post.title} by {post.author}</h2> {/* Display the post title and author */}
            <img src={post.image} alt={post.title} /> {/* Display post image */}
            <p>{post.caption}</p> {/* Display the post caption */}

            <div className="comments-section">
                <h3>Comments:</h3>
                <ul>
                    {post.comments.length > 0 ? (
                        post.comments.map(comment => (
                            <li key={comment.id}>{comment.comment_body}</li> // List all comments
                        ))
                    ) : (
                        <p>No comments yet.</p> // Message if no comments
                    )}
                </ul>
            </div>

            <div className="add-comment-section">
                <h3>Add a Comment:</h3>
                <form onSubmit={handleAddComment}> {/* Form for submitting a comment */}
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Write your comment..."
                        required // Make this field required
                    />
                    <button type="submit">Add Comment</button> {/* Submit button to add comment */}
                </form>
            </div>

            <button className="delete-post" onClick={handleDeletePost}> {/* Button to delete the post */}
                Delete Post
            </button>
        </div>
    );
}




