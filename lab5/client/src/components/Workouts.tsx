import React from 'react';

interface Workout {
  id: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  date: string;
}

interface WorkoutsProps {
  workouts: Workout[];
}

const Workouts: React.FC<WorkoutsProps> = ({ workouts }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Active Workouts</h2>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <ul className="space-y-4">
          {workouts.map((workout) => (
            <li key={workout.id} className="border-b pb-4">
              <div className="space-y-2 text-lg font-medium text-gray-800">
                <p>Type: <span className="text-gray-600">{workout.type}</span></p>
                <p>Duration: <span className="text-gray-600">{workout.duration} minutes</span></p>
                <p>Calories Burned: <span className="text-gray-600">{workout.caloriesBurned}</span></p>
                <p>Date: <span className="text-gray-600">{workout.date}</span></p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Workouts;
