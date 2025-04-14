// import { useState } from 'react';
// import { 
//   PencilIcon, 
//   TrashIcon 
// } from '@heroicons/react/24/outline';

// const TaskItem = ({ 
//   task, 
//   onUpdate, 
//   onDelete 
// }) => {
//   // ✅ Vérification si `task` est vide
//   if (!task) {
//     return <div className="text-red-500">Erreur : tâche introuvable.</div>;
//   }

//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(task.title || '');
//   const [editedDescription, setEditedDescription] = useState(task.description || '');
//   const [editedDate, setEditedDate] = useState(task.due_date || '');
//   const [editedStatus, setEditedStatus] = useState(task.status || 'pending');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleUpdate = async () => {
//     if (!editedTitle.trim()) return;

//     setIsLoading(true);
//     try {
//       await onUpdate(task.id, {
//         title: editedTitle,
//         description: editedDescription,
//         due_date: editedDate,
//         status: editedStatus
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Update error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={`bg-white p-4 rounded-lg shadow mb-3 border-l-4 ${
//       task.status === 'completed' 
//         ? 'border-green-500 bg-green-50' 
//         : task.status === 'in_progress'
//         ? 'border-yellow-500 bg-yellow-50'
//         : 'border-blue-500'
//     }`}>
//       {isEditing ? (
//         <div className="space-y-3">
//           <input
//             type="text"
//             value={editedTitle}
//             onChange={(e) => setEditedTitle(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Titre"
//           />
//           <textarea
//             value={editedDescription}
//             onChange={(e) => setEditedDescription(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="2"
//             placeholder="Description"
//           />
//           <input
//             type="date"
//             value={editedDate}
//             onChange={(e) => setEditedDate(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <select
//             value={editedStatus}
//             onChange={(e) => setEditedStatus(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="pending">En attente</option>
//             <option value="in_progress">En cours</option>
//             <option value="completed">Terminé</option>
//           </select>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleUpdate}
//               disabled={isLoading}
//               className="flex-1 bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
//             >
//               {isLoading ? 'Enregistrement...' : 'Enregistrer'}
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="flex-1 bg-gray-200 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-300"
//             >
//               Annuler
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-between items-start">
//           <div className="flex-1">
//             <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
//               {task.title}
//             </h3>
//             {task.description && (
//               <p className="text-sm text-gray-600 mt-1">{task.description}</p>
//             )}
//             <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
//               task.status === 'completed' 
//                 ? 'bg-green-100 text-green-800' 
//                 : task.status === 'in_progress'
//                 ? 'bg-yellow-100 text-yellow-800'
//                 : 'bg-blue-100 text-blue-800'
//             }`}>
//               {task.status === 'completed' 
//                 ? 'Terminé' 
//                 : task.status === 'in_progress'
//                 ? 'En cours'
//                 : 'En attente'}
//             </span>
//           </div>
          
//           <div className="flex space-x-2 ml-3">
//             <button
//               onClick={() => setIsEditing(true)}
//               className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
//               title="Modifier"
//             >
//               <PencilIcon className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => onDelete(task.id)}
//               className="p-1 text-gray-500 hover:text-red-600 transition-colors"
//               title="Supprimer"
//             >
//               <TrashIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // export default TaskItem;

// import { useState } from 'react';
// import { PencilIcon,  TrashIcon, ArrowPathIcon, CheckIcon,XMarkIcon} from '@heroicons/react/24/outline';
// import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
// import { updateTask } from '../../services/tasks';

// const TaskItem = ({ onUpdate, onDelete }) => {
//   const { id } = useParams();
//   const location = useLocation();
//   const task = location.state.task;
//   console.log("task: ",task);
  

//   // if (!task) {
//   //   return <div className="text-red-500">Erreur : tâche introuvable.</div>;
//   // }

//   const [isEditing, setIsEditing] = useState(true); // Déjà en mode édition dans le modal
//   const [editedTitle, setEditedTitle] = useState(task.title || '');
//   const [editedDescription, setEditedDescription] = useState(task.description || '');
//   const [editedDate, setEditedDate] = useState(task.due_date || '');
//   const [editedStatus, setEditedStatus] = useState(task.status || 'pending');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleUpdate = async () => {
//     if (!editedTitle.trim()) {
//       alert('Le titre est obligatoire');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const success = await updateTask(task.id, {
//         title: editedTitle,
//         description: editedDescription,
//         due_date: editedDate,
//         status: editedStatus
//       });
      
//       if (success) {
//         setIsEditing(false);
//         Navigate('/dashboard', { 
//           state: { message: 'Tâche créée avec succès' } });
//       }
//     } catch (error) {
//       console.error('Update error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={`bg-white p-4 rounded-lg ${isEditing ? '' : 'border-l-4'} ${
//       task.status === 'completed' 
//         ? 'border-green-500 bg-green-50' 
//         : task.status === 'in_progress'
//         ? 'border-yellow-500 bg-yellow-50'
//         : 'border-blue-500'
//     }`}>
//       {isEditing ? (
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
//             <input
//               type="text"
//               value={editedTitle}
//               onChange={(e) => setEditedTitle(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Titre de la tâche"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               value={editedDescription}
//               onChange={(e) => setEditedDescription(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="3"
//               placeholder="Description"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Date d'échéance</label>
//             <input
//               type="date"
//               value={editedDate}
//               onChange={(e) => setEditedDate(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
//             <select
//               value={editedStatus}
//               onChange={(e) => setEditedStatus(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="pending">En attente</option>
//               <option value="in_progress">En cours</option>
//               <option value="completed">Terminé</option>
//             </select>
//           </div>
          
//           <div className="flex justify-between space-x-3 pt-2">
//             <button
//               onClick={handleUpdate}
//               disabled={isLoading}
//               className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <>
//                   <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
//                   Enregistrement...
//                 </>
//               ) : (
//                 <>
//                   <CheckIcon className="h-4 w-4 mr-2" />
//                   Enregistrer
//                 </>
//               )}
//             </button>
            
//             <button
//               onClick={() => onDelete(task.id)}
//               className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200 flex items-center justify-center"
//             >
//               <TrashIcon className="h-4 w-4 mr-2" />
//               Supprimer
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-between items-start">
//           <div className="flex-1">
//             <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
//               {task.title}
//             </h3>
//             {task.description && (
//               <p className="text-sm text-gray-600 mt-1">{task.description}</p>
//             )}
//             {task.due_date && (
//               <p className="text-sm text-gray-500 mt-1">
//                 Échéance: {new Date(task.due_date).toLocaleDateString()}
//               </p>
//             )}
//             <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
//               task.status === 'completed' 
//                 ? 'bg-green-100 text-green-800' 
//                 : task.status === 'in_progress'
//                 ? 'bg-yellow-100 text-yellow-800'
//                 : 'bg-blue-100 text-blue-800'
//             }`}>
//               {task.status === 'completed' 
//                 ? 'Terminé' 
//                 : task.status === 'in_progress'
//                 ? 'En cours'
//                 : 'En attente'}
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskItem;
import { useState } from 'react';
import { PencilIcon, TrashIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateTask } from '../../services/tasks';

const TaskItem = ({ onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state?.task;
  
  if (!task) {
    return <div className="text-red-500 p-4">Erreur : tâche introuvable.</div>;
  }

  const [isEditing, setIsEditing] = useState(true);
  const [editedTitle, setEditedTitle] = useState(task.title || '');
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedDate, setEditedDate] = useState(task.due_date || '');
  const [editedStatus, setEditedStatus] = useState(task.status || 'pending');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!editedTitle.trim()) {
      alert('Le titre est obligatoire');
      return;
    }

    setIsLoading(true);
    try {
      const updatedTask = await updateTask(task.id, {
        title: editedTitle,
        description: editedDescription,
        due_date: editedDate,
        status: editedStatus
      });
      
      if (updatedTask) {
        // Redirection vers le dashboard avec message de succès
        navigate('/dashboard', { 
          state: { 
            message: 'Tâche modifiée avec succès',
            messageType: 'success'
          } 
        });
      }
    } catch (error) {
      console.error('Update error:', error);
      alert("Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Modifier la tâche</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre*</label>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date d'échéance</label>
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
          </select>
        </div>
        
        <div className="flex justify-between space-x-3 pt-4">
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <CheckIcon className="h-4 w-4 mr-2" />
                Enregistrer
              </>
            )}
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200 flex items-center justify-center"
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;