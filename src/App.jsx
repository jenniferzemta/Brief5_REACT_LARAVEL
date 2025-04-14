  import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

  import Login from './pages/Login';
  import Register from './pages/Register';
  import Dashboard  from './pages/Dashboard';
  import TaskForm from './components/tasks/TaskForm';
  import TaskItem from './components/tasks/TaskItem';
  import Task from './pages/Task';
  import TaskUser from './components/tasks/TaskUser';
  import PrivateRoute from './components/PrivateRoute';
  import TaskEdit from './components/tasks/TaskEdit';
  import Dash from './pages/Dash';


  function App() {
    return (

      <Router>
          <Routes>
          <Route path ='/dashboard' element={
              // proteger le dashboard pour que si l'user ne s'est pas connecte login reste ouvert
              <PrivateRoute>
              <Dashboard/>
              </PrivateRoute>
              }
              />
              <Route path ='/dash' element={
              // proteger le dashboard pour que si l'user ne s'est pas connecte login reste ouvert
              <PrivateRoute>
              <Dash/>
              </PrivateRoute>
              }
              />

            <Route path="/tasks/new" element={
                      <PrivateRoute>
                        <TaskForm />
                      </PrivateRoute>
                    } />
             <Route path="/tasks/edit/:id" element={
                      <PrivateRoute>
                        <TaskItem />
                      </PrivateRoute>
                    } />
                        
            <Route path='/task' element={ <Task/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
          
            <Route path='/taskuser' element={ <TaskUser/>}/>
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        
      </Router>
    
    );
  }

  export default App;