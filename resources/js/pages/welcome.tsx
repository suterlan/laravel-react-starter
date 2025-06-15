import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);

    // Detect scroll to add blur effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                {/* Navbar */}
                <nav
                    className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${isScrolled
                        ? 'bg-white/70 backdrop-blur-md shadow-md dark:bg-gray-900/70'
                        : 'bg-transparent'
                        }`}
                >
                    <div className="container mx-auto flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
                        >
                            YourLogo
                        </Link>
                        <div className="hidden md:flex items-center space-x-6">
                            <Link
                                href="#features"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                            >
                                Features
                            </Link>
                            <Link
                                href="#contact"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                            >
                                Contact
                            </Link>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="relative inline-block text-sm font-medium text-blue-600 transition duration-300 ease-in-out hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        <span className="absolute inset-0 scale-x-0 bg-blue-100 transition-transform duration-300 ease-in-out hover:scale-x-100 dark:bg-blue-600"></span>
                                        <span className="relative z-10">Log in</span>
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="relative inline-block text-sm font-medium text-blue-600 transition duration-300 ease-in-out hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        <span className="absolute inset-0 scale-x-0 bg-blue-100 transition-transform duration-300 ease-in-out hover:scale-x-100 dark:bg-blue-600"></span>
                                        <span className="relative z-10">Sign up</span>
                                    </Link>
                                </>
                            )}
                        </div>
                        {/* Mobile Menu */}
                        <div className="md:hidden">
                            <button
                                className="text-gray-700 dark:text-gray-300 focus:outline-none"
                                aria-label="Open Menu"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="pt-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
                    <header className="mb-10 w-full max-w-4xl">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                            Welcome to Our Platform
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Discover the best way to manage your tasks and collaborate with your team.
                        </p>
                    </header>

                    <nav className="flex items-center justify-center gap-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-blue-600 px-6 py-3 text-sm font-medium text-blue-600 shadow-md transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-400"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </nav>

                    <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </footer>
                </main>
            </div>
        </>
    );
}