import { useEffect, useState } from 'react';
import { fetchAllTasks } from '../../services/tasks';
import { CheckIcon, ClockIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Layout from '../Layouts/Layout';

const statusIcons = {
  pending: <ClockIcon className="w-5 h-5 text-yellow-500" />,
  in_progress: <RocketLaunchIcon className="w-5 h-5 text-blue-500" />,
  completed: <CheckIcon className="w-5 h-5 text-green-500" />,
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const statusLabels = {
  pending: 'En attente',
  in_progress: 'En cours',
  completed: 'Terminée',
};

const TaskUser = () => {
  const [tasksByUser, setTasksByUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchAllTasks();
        const grouped = data.reduce((acc, task) => {
          const userName = task.user?.name || 'Non assigné';
          if (!acc[userName]) acc[userName] = [];
          acc[userName].push(task);
          return acc;
        }, {});
        setTasksByUser(grouped);
      } catch (err) {
        setError('Erreur lors du chargement des tâches');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-indigo-200 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-indigo-100 rounded"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-50 text-red-600 p-6 rounded-xl max-w-md text-center">
        <p className="font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Tableau des tâches
        </motion.h2>
        <p className="text-gray-500 mb-8">Répartition des tâches par collaborateur</p>

        {Object.keys(tasksByUser).length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-gray-500">Aucune tâche à afficher pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-rows-2 lg:grid-cols-3 gap-6">
            {Object.entries(tasksByUser).map(([userName, userTasks], index) => (
              <motion.div
                key={userName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100">
                  <h3 className="text-lg font-semibold text-indigo-700 flex items-center">
                    <span className="inline-block w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                    {userName}
                    <span className="ml-auto text-sm font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      {userTasks.length} tâche{userTasks.length > 1 ? 's' : ''}
                    </span>
                  </h3>
                </div>

                <div className="divide-y divide-gray-100">
                  {userTasks.map((task) => (
                    <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800 line-clamp-1">{task.title}</h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[task.status]}`}>
                          {statusLabels[task.status]}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {task.description || 'Pas de description fournie.'}
                      </p>
                      
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>
                          {task.due_date ? (
                            <>
                              <span className="font-medium">Date: </span>
                              {new Date(task.due_date).toLocaleDateString()}
                            </>
                          ) : 'Pas de date'}
                        </span>
                        {statusIcons[task.status]}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default TaskUser;