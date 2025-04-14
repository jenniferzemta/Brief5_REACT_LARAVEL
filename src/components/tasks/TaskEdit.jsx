import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../../services/tasks';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TaskEdit = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Vérification des données reçues
  if (!state?.task) {
    return (
      <div className="p-4 text-red-500">
        Données de tâche non reçues. 
        <button onClick={() => navigate('/tasks')} className="ml-2 underline">
          Retour
        </button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    title: state.task.title,
    description: state.task.description || '',
    due_date: state.task.due_date || '',
    status: state.task.status || 'pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Utilise la fonction passée ou la fonction directe
      const success = state.onUpdate 
        ? await state.onUpdate(id, formData)
        : await updateTask(id, formData);
      
      if (success) navigate('/dashboard');
    } catch (error) {
      console.error("Update failed:", error);
      alert("Échec de la mise à jour");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier la tâche</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champs du formulaire identiques à l'exemple précédent */}
        {/* ... */}
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/tasks')}
            className="flex items-center px-4 py-2 border rounded-md"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Annuler
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            <CheckIcon className="h-4 w-4 mr-1" />
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;