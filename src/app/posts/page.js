import { db } from "@/utils/utilities.js";
import Link from "next/link";
import "@/styles/posts.css"; // Imports CSS file from src/styles/post.css

export default async function PostsPage({ searchParams }) {
    // Ensure searchParams is awaited, kept getting an error here, but searchParams is an object past,
    // so I destructure and pull out the order value out of the searchParams object.
    const { order } = await searchParams;

    // Set the order to DESC by default if it's not specified, using a ternary.
    // This basically takes the search param as "asc" and turns it into "ASC"
    // so it can be used to query the database.
    const sortingOrder = order === "asc" ? "ASC" : "DESC"; 

    const res = await db.query(`
        SELECT posts.*, ARRAY_AGG(json_build_object(
            'id', comments.id,
            'comment_body', comments.comment_body,
            'post_id', comments.post_id
        )) AS comments
        FROM posts
        LEFT JOIN comments ON comments.post_id = posts.id
        GROUP BY posts.id
        ORDER BY posts.id ${sortingOrder};  -- Sorting by post ID, either ASC or DESC based on the query parameter
    `); 

    const posts = res.rows;

    // Firstly, res = the database table which contains the posts table and added comments for each post,
    // based on comments.post_id = post.id to associate which comment belongs to which post.
    // Basically, it starts with the posts table, joins the comments on the row if comments.post_id = post.id,
    // and it makes an array of JSON objects for the comments.

    // Then posts = res.rows turns the database query result into an array of objects,
    // where each object represents a row of the table, essentially each post and its comments as an object.

    return (
        <div className="posts-container">
            {/* Sorting Buttons */}
            <div className="sort-buttons">
                <Link href="?order=desc">
                    <button className="newest">Newest Posts First</button>
                </Link>
                <Link href="?order=asc">
                    <button className="oldest">Oldest Posts First</button>
                </Link>
            </div>

            {/* Posts Feed */}
            <div className="posts-feed">
                {posts.length === 0 ? (
                    <p className="text-gray-500 text-center">No posts yet</p>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="post-card">
                            {/* Post Title */}
                            <h2 className="post-title">
                                <Link href={`/posts/${post.id}`}>
                                    <span>{post.title} by {post.author}</span>
                                </Link>
                            </h2>

                            {/* Post Image */}
                            <Link href={`/posts/${post.id}`}>
                                <img src={post.image} alt={post.title} className="post-image" />
                            </Link>

                            {/* Post Caption */}
                            <p className="post-caption">Caption: {post.caption}</p>

                            {/* Comments Section */}
                            <div className="comments-section">
                                <h3>Comments:</h3>
                                <ul>
                                    {post.comments.length > 0 ? (
                                        post.comments.map(comment => (
                                            <li key={comment.id} className="comment-box">
                                                {comment.comment_body}
                                            </li> 
                                        ))
                                    ) : (
                                        <p>No comments yet.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
