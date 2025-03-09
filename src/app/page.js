import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Welcome to Our Blog</h1>
            <p className="text-lg mb-6">
                Welcome to our blog website! Here’s how to use the site:
            </p>

            <h2 className="text-2xl font-semibold mb-4">Navigate to the Posts Page:</h2>
            <p className="text-lg mb-4">
                You can browse through all the posts by clicking on the <b>Posts</b> link in the navigation bar.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">View an Individual Post:</h2>
            <p className="text-lg mb-4">
                On the posts page, click on any post title to view the full post. You can read the post's caption and
                view its comments. If you'd like, you can add a comment using the provided form or delete the post by clicking the delete button.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Create a New Post:</h2>
            <p className="text-lg mb-6">
                If you want to create a new post, simply navigate to the <b>Create New Post</b> link in the navigation bar.
                There, you’ll find a form to add a title, caption, and image for your post. Once you fill out the form and submit it, the new post will appear on the posts page.
            </p>

            <div className="text-center">
                <Link href="/posts" className="bg-blue-500 text-white px-4 py-2 rounded-md">Go to Posts</Link>
            </div>
        </div>
    );
}

