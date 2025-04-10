import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import {  fetchTasks,  createTask, updateTask,   deleteTask, toggleTaskStatus } from '../../services/tasks';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des tâches');
      } finally {
        setLoading(false);
      }
    };
    
    loadTasks();
  }, []);

  const handleTaskCreated = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
    } catch (err) {
      throw err;
    }
  };

//   const handleTaskUpdated = async (taskId, updatedData) => {
//     try {
//       const updatedTask = await updateTask(taskId, updatedData);
//       setTasks(tasks.map(task => 
//         task.id === taskId ? updatedTask : task
//       ));
//     } catch (err) {
//       throw err;
//     }
//   };
  const handleTaskUpdated = async (taskId, updatedData) => {
    try {
      const updatedTask = await updateTask(taskId, updatedData);
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ));
    } catch (err) {
      throw err;
    }
  };


  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus });
      // Mettre à jour l'état local si nécessaire
    } catch (error) {
      console.error("Failed to update task status", error);
      throw error;
    }
  };
  

  const handleTaskDeleted = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const toggledTask = await toggleTaskStatus(taskId);
      setTasks(tasks.map(task => 
        task.id === taskId ? toggledTask : task
      ));
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  if (loading) return <div className="text-center py-8">Chargement des tâches...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div>
      <TaskForm onTaskCreated={handleTaskCreated} />
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Mes Tâches ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucune tâche pour le moment. Ajoutez-en une !
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={handleTaskUpdated}
                onStatusChange={handleStatusChange}
                onDelete={handleTaskDeleted}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;