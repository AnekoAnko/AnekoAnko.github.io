import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth"; 
import React from "react";
import WorkoutPrograms from "./components/WorkoutPrograms";
import ProgressChart from "./components/ProgressChart";



function PrivateRoute({ children }: { children: React.JSX.Element }) {
  const { user } = useAuth();


  if (user === null) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/auth" replace />;
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <NavLink to="/workouts" className="text-blue-500">Workouts</NavLink>
        <NavLink to="/progress" className="text-blue-500">Progress</NavLink>
        <NavLink to="/auth" className="text-blue-500">Auth</NavLink>
      </nav>
      
      <div className="p-4">
        <Routes>
          <Route path="/workouts" element={<PrivateRoute><WorkoutPrograms /></PrivateRoute>} />
          <Route path="/auth" element={<Auth />} />

          <Route path="/progress" element={<PrivateRoute><ProgressChart /></PrivateRoute>} />
          <Route path="*" element={<Navigate to={user ? "/" : "/auth"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
