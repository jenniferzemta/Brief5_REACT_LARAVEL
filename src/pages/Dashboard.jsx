// import TaskList from "../components/tasks/TaskList";

// const Dashboard = () => {
//   return (
//     <div className="container mx-auto px-4 py-8 max-w-3xl">
//       <h1 className="text-2xl font-bold mb-6"> Gestion des taches</h1>
//       <TaskList />
//     </div>
//   );
// };

// export default Dashboard;

import Layout from "../components/Layouts/Layout";
import TaskList from "../components/tasks/TaskList";
import {Link} from 'react-router-dom';
import { 
 PlusIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-7xl font-sans bg-white mx-5  px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="mt-3 text-2xl font-bold pb-8 text-gray-900">GESTION DES TACHES</h1>
    {/* bouton ajouter */}
      <Link to="/tasks/new"
        className="bg-indigo-500 w-48 text-white  px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
          >
         <PlusIcon className="h-5 w-5 mr-2" />
           Ajouter une tâche
            </Link>
            <div className="mt-10">
        <TaskList />
        
</div>
      </div>
    </Layout>
  );
};

export default Dashboard;