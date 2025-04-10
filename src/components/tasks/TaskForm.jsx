import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import {  fetchTasks,  createTask, updateTask,   deleteTask, toggleTaskStatus } from '../../services/tasks';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due_date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Le titre est obligatoire');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newTask = { title, description ,due_date};
      await onTaskCreated(newTask);
      setTitle('');
      setDescription('');
      setDate('');
      alert('Tache cree');
    } catch (err) {
      setError(err.message || 'Erreur lors de la création de la tâche');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle tâche</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Titre *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Titre de la tâche"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Description détaillée (optionnelle)"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
            Date de creation
          </label>
          <input
            type="date"
            id="due_date"
            value={due_date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="inserer la date"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            'En cours...'
          ) : (
            <>
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Ajouter la tâche
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;