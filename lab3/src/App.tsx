import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import {
  Card,
} from "./components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import MealPlan from "./components/MealPlan";

interface IWorkout {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  calories: number;
}

const workouts: IWorkout[] = [
  {
    id: 1,
    name: "Running",
    type: "Cardio",
    description: "A great workout for burning fat and improving cardiovascular health.",
    image: "https://www.shape.com/thmb/DjCIHGX6cWaIniuqHeBAAreNE08=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-cardio-exercises-promo-2000-498cbfb8f07541b78572bf810e7fb600.jpg", 
    calories: 300,
  },
  {
    id: 2,
    name: "Bench Press",
    type: "Strength",
    description: "Strength training to build upper body strength and muscle mass.",
    image: "https://hips.hearstapps.com/hmg-prod/images/powerlifter-with-strong-arms-lifting-weights-royalty-free-image-595768514-1546267269.jpg", 
    calories: 200,
  },
  {
    id: 3,
    name: "Yoga Session",
    type: "Yoga",
    description: "Focus on flexibility, balance, and mental relaxation.",
    image: "https://a.storyblok.com/f/97382/2000x1500/4c15e1224b/cover-benefits-of-yoga-and-meditation.png", 
    calories: 100,
  },
];

const progressData = [
  { date: "2024-02-01", weight: 70 },
  { date: "2024-02-15", weight: 69 },
  { date: "2024-03-01", weight: 68 },
];

function WorkoutCard({ workout }: { workout: IWorkout }) {
  return (
    <Card className="p-4 m-2 border rounded-lg shadow">
      <img src={workout.image} alt={workout.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold">{workout.name}</h2>
      <p className="text-gray-600">{workout.description}</p>
      <p className="text-gray-600">Type: {workout.type}</p>
      <p className="text-gray-600">Calories: {workout.calories} kcal</p>
    </Card>
  );
}

function Workouts() {
  const [filter, setFilter] = useState("All");
  const filteredWorkouts = filter === "All" ? workouts : workouts.filter(w => w.type === filter);

  return (
    <div>
      <h1 className="text-2xl font-bold">Workouts</h1>
      <select onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
        <option value="All">All</option>
        <option value="Cardio">Cardio</option>
        <option value="Strength">Strength</option>
        <option value="Yoga">Yoga</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}

function ProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={progressData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to="/" className="text-blue-500">Workouts</Link>
        <Link to="/progress" className="text-blue-500">Progress</Link>
        <Link to="/meal-plan" className="text-blue-500">Meal Plan</Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Workouts />} />
          <Route path="/progress" element={<ProgressChart />} />
          <Route path="/meal-plan" element={<MealPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
