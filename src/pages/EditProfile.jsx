// EditProfile.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../../services/auth';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: null,
    preview: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getUserProfile();
        setFormData({
          name: user.name,
          email: user.email,
          avatar: null,
          preview: user.avatar_url
        });
      } catch (err) {
        setError('Erreur de chargement du profil');
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      if (formData.avatar) {
        formPayload.append('avatar', formData.avatar);
      }

      await updateUserProfile(formPayload);
      navigate('/dashboard', { state: { message: 'Profil mis à jour' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de mise à jour');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Modifier le profil</h2>
      
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          <label className="cursor-pointer">
            <img 
              src={formData.preview || '/default-avatar.png'} 
              alt="Avatar" 
              className="mx-auto h-24 w-24 rounded-full mb-2 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-sm text-blue-600">Changer la photo</p>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 border rounded"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};