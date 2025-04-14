// UserProfileCard.jsx
import { PencilIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const UserProfileCard = ({ user }) => {
  return (
    <div className="text-center">
      <div className="relative mx-auto w-24 h-24 mb-4">
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt="Profil" 
          className="rounded-full w-full h-full object-cover"
        />
        <Link 
          to="/profile/edit"
          className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md"
        >
          <PencilIcon className="h-5 w-5 text-blue-600" />
        </Link>
      </div>

      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600 mb-4">{user.email}</p>

      <div className="mt-6 space-y-2 text-left">
        <div className="flex justify-between">
          <span className="text-gray-500">Tâches totales:</span>
          <span>{user.task_count || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Inscrit depuis:</span>
          <span>{new Date(user.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      <Link
        to="/profile/edit"
        className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Modifier le profil
      </Link>
    </div>
  );
};