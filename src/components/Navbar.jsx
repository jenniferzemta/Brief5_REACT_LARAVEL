import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                    Task Manager
                </Link>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-600">Hello, {user.name}</span>
                            <button
                                onClick={logout}
                                className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                                Login
                            </Link>
                            <Link to="/register" className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}