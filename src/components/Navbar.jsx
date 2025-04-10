import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated, getUser } from '../services/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    
    if (isAuthenticated()) {
      fetchUser();
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          TodoApp
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden sm:inline">Bonjour, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Connexion
              </Link>
              <Link 
                to="/register" 
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;