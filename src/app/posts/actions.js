"use server";

import { db } from "@/utils/utilities.js";

export async function createPost(formData) {
    const { title, author, image, caption } = formData;
    try {
        await db.query(
            `INSERT INTO posts (title, author, image, caption) VALUES ($1, $2, $3, $4)`,
            [title, author, image, caption]
        );
    } catch (error) {
        console.error("Error inserting post:", error);
        throw new Error("Failed to create post");
    }
}

//comments and deleting server functions.


// Fetch post and comments by ID
export async function getPostWithComments(id) {
    const res = await db.query(`
        SELECT posts.*, ARRAY_AGG(json_build_object(
            'id', comments.id,
            'comment_body', comments.comment_body,
            'post_id', comments.post_id
        )) AS comments
        FROM posts
        LEFT JOIN comments ON comments.post_id = posts.id
        WHERE posts.id = $1
        GROUP BY posts.id
    `, [id]);

    return res.rows[0];
}

// Add a comment to a post
export async function addComment(postId, commentBody) {
    const res = await db.query(`
        INSERT INTO comments (post_id, comment_body)
        VALUES ($1, $2)
        RETURNING id, comment_body
    `, [postId, commentBody]);

    return res.rows[0]; // Returns the new comment object
}

// Delete a post
export async function deletePost(id) {
    const res = await db.query(`
        DELETE FROM posts WHERE id = $1 RETURNING id
    `, [id]);

    return res.rows[0]; // Returns the deleted post's ID
}
