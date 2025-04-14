// import { useState } from 'react';
// import { PlusCircleIcon } from '@heroicons/react/24/outline';
// import {  fetchTasks,  createTask, updateTask,   deleteTask, toggleTaskStatus } from '../../services/tasks';

// const TaskForm = ({ onTaskCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [due_date, setDate] = useState('');
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) {
//       setError('Le titre est obligatoire');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const newTask = { title, description ,due_date};
//       await onTaskCreated(newTask);
//       setTitle('');
//       setDescription('');
//       setDate('');
//       alert('Tache cree');
//     } catch (err) {
//       setError(err.message || 'Erreur lors de la création de la tâche');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//       <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle tâche</h2>
//       {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//             Titre *
//           </label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Titre de la tâche"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="3"
//             placeholder="Description détaillée (optionnelle)"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
//             Date de creation
//           </label>
//           <input
//             type="date"
//             id="due_date"
//             value={due_date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="inserer la date"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
//             isLoading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {isLoading ? (
//             'En cours...'
//           ) : (
//             <>
//               <PlusCircleIcon className="h-5 w-5 mr-2" />
//               Ajouter la tâche
//             </>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createTask } from '../../services/tasks';
import TagSelector from '../tags/TagSelector';



const TaskForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'pending'
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Le titre est obligatoire');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createTask(formData);
      navigate('/dashboard', { 
        state: { message: 'Tâche créée avec succès' } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="min-h-sreen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-12">
    
      <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
        {/* Logo/Titre */}
        <div className=" mb-8">
        
          <h1 className="mt-3 text-3xl text-center font-extrabold text-gray-900">Ajout</h1>
    <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
     

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre 
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Titre de la tâche"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Description détaillée"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
                Date 
              </label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              'Enregistrement...'
            ) : (
              <>
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Créer la tâche
              </>
            )}
          </button>
       
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Retour
        </button>
      
      </div>
       
      </form>
    </div>
    </div>
    </div>
    </div>

  );
};

export default TaskForm;