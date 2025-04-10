import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Task Management App
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                    Organize your tasks efficiently and boost your productivity
                </p>
                <div className="mt-10 flex justify-center space-x-4">
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-blue-500 mb-4">
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Task Management</h3>
                    <p className="mt-2 text-gray-500">
                        Create, edit and organize your tasks in one place.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-blue-500 mb-4">
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Categories</h3>
                    <p className="mt-2 text-gray-500">
                        Organize tasks by categories for better management.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-blue-500 mb-4">
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Status Tracking</h3>
                    <p className="mt-2 text-gray-500">
                        Easily track completed and pending tasks.
                    </p>
                </div>
            </div>
        </div>
    );
}