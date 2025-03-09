// src/app/components/Navbar.js
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link href="/" className="text-xl font-bold">
                    Home
                </Link>
                <div>
                    <Link href="/posts" className="px-4">Posts</Link>
                    <Link href="/posts/new" className="px-4">Create New Post</Link>
                </div>
            </div>
        </nav>
    );
}
