import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getWorkouts = async () => {
  try {
    const response = await axios.get(`${API_URL}/workouts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching workouts', error);
    return [];
  }
};

export const addWorkout = async (workout: { type: string; duration: number; caloriesBurned: number; date: string }) => {
  try {
    const response = await axios.post(`${API_URL}/workouts`, workout);
    console.log('Workout added:', response.data);
  } catch (error) {
    console.error('Error adding workout', error);
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    console.log('User registered:', response.data);
  } catch (error) {
    console.error('Error registering user', error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('User logged in:', response.data);
  } catch (error) {
    console.error('Error logging in user', error);
  }
};
