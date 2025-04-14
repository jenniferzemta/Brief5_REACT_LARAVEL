// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../../services/auth';
// import { CogIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = { name: "John Doe" }; // À remplacer par vos données utilisateur

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold text-blue-600">
//           TodoApp
//         </Link>
        
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <UserCircleIcon className="h-6 w-6 text-gray-500" />
//             <span className="font-medium">{user.name}</span>
//           </div>
          
//           <button 
//             onClick={handleLogout}
//             className="text-gray-600 hover:text-blue-600"
//           >
//             <CogIcon className="h-6 w-6" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import { CogIcon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = { name: "John Doe", email: "john@example.com" };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          TodoApp
        </Link>
        
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <UserCircleIcon className="h-8 w-8 text-gray-500" />
            <div className="text-left hidden md:block">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Mon profil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;