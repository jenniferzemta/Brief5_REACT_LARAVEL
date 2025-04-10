// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// //import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { AuthProvider } from './context/AuthContext';
import App from './App';

// Enveloppez votre application avec le AuthProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);