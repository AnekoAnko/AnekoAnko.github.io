import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { getWorkouts, addWorkout } from '../api';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Workouts from './components/Workouts';
import AddWorkout from './components/AddWorkout';
import { AuthProvider, useAuth } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  console.log(isAuthenticated )

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Fitness Tracker</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/workouts" className="hover:text-gray-300">Workouts</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/add-workout" className="hover:text-gray-300">Add Workout</Link></li>
              <li><button onClick={logout} className="hover:text-gray-300 cursor-pointer">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/register" className="hover:text-gray-300">Authentication</Link></li>
              <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkouts().then((data) => {
      setWorkouts(data);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<h1 className="text-center mt-20">Welcome to Fitness Tracker</h1>} />
      <Route path="/workouts" element={<Workouts workouts={workouts} />} />
      <Route path="/add-workout" element={isAuthenticated ? <AddWorkout onAdd={addWorkout} /> : <Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
