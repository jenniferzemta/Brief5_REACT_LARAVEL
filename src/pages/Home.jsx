import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur TodoApp</h1>
      <p className="mb-6">Gérez vos tâches quotidiennes facilement</p>
      <div className="space-x-4">
        <Link 
          to="/login" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connexion
        </Link>
        <Link 
          to="/register" 
          className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-gray-100"
        >
          Inscription
        </Link>
      </div>
    </div>
  );
};

export default Home;