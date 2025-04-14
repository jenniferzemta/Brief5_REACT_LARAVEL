// import { Link } from 'react-router-dom';
// import { 
//   Squares2X2Icon,
//   CalendarIcon,
//   ChartBarIcon,
//   CogIcon
// } from '@heroicons/react/24/outline';

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-white shadow-md flex flex-col h-full">
//       {/* Logo/Titre */}
//       <div className="p-4 border-b">
//         <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
//       </div>
      
//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto">
//         <Link 
//           to="/dashboard" 
//           className="flex items-center p-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
//         >
//           <Squares2X2Icon className="h-5 w-5 mr-3" />
//           Tâches
//         </Link>
        
//         <Link 
//           to="/calendar" 
//           className="flex items-center p-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
//         >
//           <CalendarIcon className="h-5 w-5 mr-3" />
//           Calendrier
//         </Link>
        
//         <Link 
//           to="/stats" 
//           className="flex items-center p-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
//         >
//           <ChartBarIcon className="h-5 w-5 mr-3" />
//           Statistiques
//         </Link>
//       </nav>
      
//       {/* Paramètres (en bas) */}
//       <div className="p-4 border-t">
//         <Link 
//           to="/settings" 
//           className="flex items-center text-gray-600 hover:text-blue-600"
//         >
//           <CogIcon className="h-5 w-5 mr-3" />
//           Paramètres
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import { NavLink , Link} from 'react-router-dom';
import { 
  Squares2X2Icon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="w-48 h-screen bg-white  flex flex-col border-r border-gray-200">
      {/* Logo/Titre */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            `flex items-center p-4 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'} transition-colors`
          }
        >
          <Squares2X2Icon className="h-5 w-5 mr-3" />
          Mes Tâches
        </NavLink>

     {/* parametres */}

     <Link 
          to="/taskuser" 
          className="flex items-center p-4 bg-white text-blue-600 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <CogIcon className="h-5 w-5 mr-3" />
       Autres Taches
        </Link>
  

  {/* tous les users */}

      
    </nav>
      
     
    </div>
  );
};

export default Sidebar;