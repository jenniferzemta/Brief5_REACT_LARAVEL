// Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserTasks } from '../services/tasks';
import { getUserProfile } from '../services/auth';

const Dash = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [tasks, setTasks] = useState({ pending: [], completed: [] });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tasksData, userData] = await Promise.all([
          fetchUserTasks(),
         // getUserProfile()
        ]);
        
        setTasks({
          pending: tasksData.filter(t => t.status !== 'completed'),
          completed: tasksData.filter(t => t.status === 'completed')
        });
      //  setUser(userData);
      } catch (error) {
        console.error("Erreur de chargement", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) return <div className="text-center py-8">Chargement...</div>;

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Colonne Profil */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
     {/* //   <UserProfileCard user={user} /> */}
      </div>

      {/* Colonne Tâches */}
      <div className="lg:col-span-2 space-y-6">
        {/* Onglets */}
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('pending')}
          >
            Tâches en cours ({tasks.pending.length})
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('completed')}
          >
            Tâches terminées ({tasks.completed.length})
          </button>
        </div>

        {/* Liste des tâches */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {activeTab === 'pending' ? (
            <TaskList tasks={tasks.pending} type="pending" />
          ) : (
            <TaskList tasks={tasks.completed} type="completed" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dash;