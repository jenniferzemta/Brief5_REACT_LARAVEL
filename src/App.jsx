import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard  from './pages/Dashboard';
import Navbar from './components/Navbar';

import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Navbar />
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  
          <Route path ='/dashboard' element={<Dashboard/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      
    </Router>
  );
}

export default App;