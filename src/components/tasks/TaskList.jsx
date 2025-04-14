// // import { useState, useEffect } from 'react';
// // import TaskItem from './TaskItem';
// // import TaskForm from './TaskForm';
// // import {  fetchTasks,  createTask, updateTask,   deleteTask, toggleTaskStatus } from '../../services/tasks';

// // const TaskList = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [filteredTasks, setFilteredTasks] = useState([]); // Tâches filtrées
// //   const [filter, setFilter] = useState('all'); // 'all', 'pending', 'in_progress', 'completed'
// //   const [loading, setLoading] = useState(true);
// //   const [showAll, setShowAll] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const loadTasks = async () => {
// //       try {
// //         const tasksData = await fetchTasks();
// //         setTasks(tasksData);
// //         setFilteredTasks(tasksData); // Initialise avec toutes les tâches
// //       } catch (err) {
// //         setError(err.message || 'Erreur lors du chargement des tâches');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     loadTasks();
// //   }, []);


// //   // Applique le filtre à chaque changement de `filter` ou de `tasks`
// //   useEffect(() => {
// //     let filtered = tasks;
// //     if (filter !== 'all') {
// //       filtered = tasks.filter(task => task.status === filter);
// //     }
// //     setFilteredTasks(filtered);
// //   }, [filter, tasks]);


// // //   creation de tache
// //   const handleTaskCreated = async (newTask) => {
// //     try {
// //       const createdTask = await createTask(newTask);
// //       setTasks([...tasks, createdTask]);
// //     } catch (err) {
// //       throw err;
// //     }
// //   };

// // //   const handleTaskUpdated = async (taskId, updatedData) => {
// // //     try {
// // //       const updatedTask = await updateTask(taskId, updatedData);
// // //       setTasks(tasks.map(task => 
// // //         task.id === taskId ? updatedTask : task
// // //       ));
// // //     } catch (err) {
// // //       throw err;
// // //     }
// // //   };
// //   const handleTaskUpdated = async (taskId, updatedData) => {
// //     try {
// //       const updatedTask = await updateTask(taskId, updatedData);
// //       setTasks(tasks.map(task => 
// //         task.id === taskId ? updatedTask : task
// //       ));
// //     } catch (err) {
// //       throw err;
// //     }
// //   };


// //   const handleStatusChange = async (taskId, newStatus) => {
// //     try {
// //       await taskService.updateTask(taskId, { status: newStatus });
// //       // Mettre à jour l'état local si nécessaire
// //     } catch (error) {
// //       console.error("Failed to update task status", error);
// //       throw error;
// //     }
// //   };
  

// //   const handleTaskDeleted = async (taskId) => {
// //     try {
// //       await deleteTask(taskId);
// //       setTasks(tasks.filter(task => task.id !== taskId));
// //     } catch (err) {
// //       console.error('Delete error:', err);
// //     }
// //   };

// //   const handleToggleComplete = async (taskId) => {
// //     try {
// //       const toggledTask = await toggleTaskStatus(taskId);
// //       setTasks(tasks.map(task => 
// //         task.id === taskId ? toggledTask : task
// //       ));
// //     } catch (err) {
// //       console.error('Toggle error:', err);
// //     }
// //   };

// //   if (loading) return <div className="text-center py-8">Chargement des tâches...</div>;
// //   if (error) return <div className="text-red-500 p-4">{error}</div>;

// //   return (
// //     <div>
// //       {/* <TaskForm onTaskCreated={handleTaskCreated} /> */}
      

// //       {/* Barre de filtres */}
// //       <div className="flex space-x-2 mb-4 p-2 bg-gray-100 rounded-lg">
// //         <button
// //           onClick={() => setFilter('all')}
// //           className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white'}`}
// //         >
// //           Toutes
// //         </button>
// //         <button
// //           onClick={() => setFilter('pending')}
// //           className={`px-3 py-1 rounded-md ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-white'}`}
// //         >
// //           En attente
// //         </button>
// //         <button
// //           onClick={() => setFilter('in_progress')}
// //           className={`px-3 py-1 rounded-md ${filter === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-white'}`}
// //         >
// //           En cours
// //         </button>
// //         <button
// //           onClick={() => setFilter('completed')}
// //           className={`px-3 py-1 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white'}`}
// //         >
// //           Terminées
// //         </button>
// //       </div>
// // {/* 
// //       <div className="mb-4">
// //         <h2 className="text-xl font-semibold mb-2">Mes Tâches ({tasks.length})</h2>
// //         {tasks.length === 0 ? (
// //           <div className="text-center py-8 text-gray-500">
// //             Aucune tâche pour le moment. Ajoutez-en une !
// //           </div>
// //         ) : (
// //           <div className="space-y-3">
// //             {tasks.map(task => ( */}

// //               {/* Liste des tâches (filtrées) */}
// //       <div className="mb-4">
// //         <h2 className="text-xl font-semibold mb-2">
// //           {filter === 'all' ? 'Toutes les tâches' : 
// //            filter === 'pending' ? 'Tâches en attente' :
// //            filter === 'in_progress' ? 'Tâches en cours' : 'Tâches terminées'} 
// //           ({filteredTasks.length})
// //         </h2>

// //         {filteredTasks.length === 0 ? (
// //           <div className="text-center py-8 text-gray-500">
// //             Aucune tâche {filter !== 'all' ? 'de ce type' : ''}. Ajoutez-en une !
// //           </div>
// //         ) : (
// //           <div className="space-y-3">
// //             {filteredTasks.map(task => (
// //               <TaskItem
// //                 key={task.id}
// //                 task={task}
// //                 onUpdate={handleTaskUpdated}
// //                 onStatusChange={handleStatusChange}
// //                 onDelete={handleTaskDeleted}
// //                 onToggleComplete={handleToggleComplete}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TaskList;

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   PencilIcon, 
//   TrashIcon, 
//   CheckIcon,
//   PlusIcon
// } from '@heroicons/react/24/outline';
// import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from '../../services/tasks';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadTasks = async () => {
//       try {
//         const tasksData = await fetchTasks();
//         setTasks(tasksData);
//         setFilteredTasks(tasksData);
//       } catch (err) {
//         setError(err.message || 'Erreur lors du chargement des tâches');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadTasks();
//   }, []);

//   useEffect(() => {
//     let filtered = tasks;
//     if (filter !== 'all') {
//       filtered = tasks.filter(task => task.status === filter);
//     }
//     setFilteredTasks(filtered);
//   }, [filter, tasks]);

//   const handleStatusChange = async (taskId) => {
//     try {
//       const toggledTask = await toggleTaskStatus(taskId);
//       setTasks(tasks.map(task => 
//         task.id === taskId ? toggledTask : task
//       ));
//     } catch (error) {
//       console.error("Failed to update task status", error);
//     }
//   };

//   const handleTaskDeleted = async (taskId) => {
//     try {
//       await deleteTask(taskId);
//       setTasks(tasks.filter(task => task.id !== taskId));
//     } catch (err) {
//       console.error('Delete error:', err);
//     }
//   };

//   if (loading) return <div className="text-center py-8">Chargement des tâches...</div>;
//   if (error) return <div className="text-red-500 p-4">{error}</div>;

//   return (
//     <div className="p-6">
//       {/* En-tête avec bouton d'ajout */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">
//           {filter === 'all' ? 'Toutes les tâches' : 
//            filter === 'pending' ? 'Tâches en attente' :
//            filter === 'in_progress' ? 'Tâches en cours' : 'Tâches terminées'}
//         </h1>
//         <Link 
//           to="/tasks/new" 
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
//         >
//           <PlusIcon className="h-5 w-5 mr-2" />
//           Ajouter une tâche
//         </Link>
//       </div>

//       {/* Barre de filtres */}
//       <div className="flex space-x-2 mb-6">
//         <button
//           onClick={() => setFilter('all')}
//           className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           Toutes
//         </button>
//         <button
//           onClick={() => setFilter('pending')}
//           className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           En attente
//         </button>
//         <button
//           onClick={() => setFilter('in_progress')}
//           className={`px-4 py-2 rounded-md ${filter === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           En cours
//         </button>
//         <button
//           onClick={() => setFilter('completed')}
//           className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           Terminées
//         </button>
//       </div>

//       {/* Tableau des tâches */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tâche</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredTasks.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
//                   Aucune tâche {filter !== 'all' ? 'de ce type' : ''}. Ajoutez-en une !
//                 </td>
//               </tr>
//             ) : (
//               filteredTasks.map((task) => (
//                 <tr key={task.id} className={task.status === 'completed' ? 'bg-gray-50' : ''}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button 
//                       onClick={() => handleStatusChange(task.id)}
//                       className={`h-5 w-5 rounded border flex items-center justify-center ${
//                         task.status === 'completed' 
//                           ? 'bg-green-500 border-green-500' 
//                           : 'border-gray-300'
//                       }`}
//                     >
//                       {task.status === 'completed' && <CheckIcon className="h-4 w-4 text-white" />}
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className={`${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
//                       {task.title}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-500 max-w-xs truncate">
//                       {task.description}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-500">
//                       {task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <Link 
//                       to={`/tasks/edit/${task.id}`}
//                       className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
//                     >
//                       <PencilIcon className="h-5 w-5 mr-1" /> Modifier
//                     </Link>
//                     <button 
//                       onClick={() => handleTaskDeleted(task.id)}
//                       className="text-red-600 hover:text-red-900 inline-flex items-center"
//                     >
//                       <TrashIcon className="h-5 w-5 mr-1" /> Supprimer
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TaskList;






import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PencilIcon, 
  TrashIcon, 
  CheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

import { fetchTasks, deleteTask, toggleTaskStatus } from '../../services/tasks';
import { motion } from 'framer-motion';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // Nouvel état pour gérer l'édition
  const [editedTask, setEditedTask] = useState({}); // Stocke les modifications


  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
        console.log(tasksData);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des tâches');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  const handleStatusChange = async (taskId) => {
    try {
      const toggledTask = await toggleTaskStatus(taskId);
      setTasks(tasks.map(task => 
        task.id === taskId ? toggledTask : task
      ));
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };
// updtae
  // const handleTaskUpdated = async (taskId, updatedData) => {
  //       try {
  //         const updatedTask = await updateTask(taskId, updatedData);
  //         setTasks(tasks.map(task => 
  //           task.id === taskId ? updatedTask : task
  //         ));
  //       } catch (err) {
  //         throw err;
  //       }
  //     };
  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditedTask({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (taskId) => {
    try {
      const updatedTask = await updateTask(taskId, editedTask);
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      setEditingId(null);
    } catch (err) {
      console.error("Échec de la mise à jour", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

      const handleTaskUpdated = async (taskId, updatedData) => {
        try {
          const updatedTask = await updateTask(taskId, updatedData);
          setTasks(tasks.map(task => 
            task.id === taskId ? updatedTask : task
          ));
          return true; // Indique que la mise à jour a réussi
        } catch (err) {
          console.error("Échec de la mise à jour", err);
          return false; // Indique que la mise à jour a échoué
        }
      };
  const handleDelete = async (taskId) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      try {
        await deleteTask(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  if (loading) return 

  <div className="flex items-center justify-center h-screen">
  <div className="animate-pulse flex flex-col items-center">
    <div className="h-12 w-12 bg-indigo-200 rounded-full mb-4"></div>
    <div className="h-4 w-32 bg-indigo-100 rounded"></div>
  </div>
</div>

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
   
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* En-tête avec filtres */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">



        <h2 className="text-sm font-semibold">
       
            
          {filter === 'all' ? 'Toutes les tâches' : 
           filter === 'pending' ? 'Tâches en attente' :
           filter === 'in_progress' ? 'Tâches en cours' : 'Tâches terminées'}
          <span className="text-gray-500 ml-2">({filteredTasks.length})</span>
        </h2>

       
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md ${filter === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 text-sm rounded-md ${filter === 'pending' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            En attente
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-3 py-1 text-sm rounded-md ${filter === 'in_progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            En cours
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-sm rounded-md ${filter === 'completed' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            Terminées
          </button>
        </div>
      </div>

      {/* Tableau des tâches */}
      <div className="overflow-x-auto">
        <table className="min-w-full  divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                Titre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-indigo-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Aucune tâche trouvée
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr  key={task.id} className={task.status === 'completed' ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleStatusChange(task.id)}
                      className={`h-5 w-5 rounded border flex items-center justify-center ${
                        task.status === 'completed' 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300 hover:border-blue-500'
                      } transition-colors`}
                    >
                      {task.status === 'completed' && <CheckIcon className="h-4 w-4 text-white" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {task.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {task.description || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}
                    </div>
                  </td>

                  {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                    </button> */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    to={`/tasks/edit/${task.id}`}
                  
                    state={{ 
                      task, 
                      onUpdate: handleTaskUpdated, 
                      onDelete: handleDelete 
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                  </Link>
                                <button 
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" /> 
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default TaskList;