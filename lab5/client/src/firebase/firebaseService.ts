import { db} from "./firebase"; 
import { ref, set, get, child, update, remove } from "firebase/database";
import { WorkoutProps } from "../components/WorkoutPrograms";

export const addWorkoutProgram = async (id: string, data: WorkoutProps) => {
  try {
    await set(ref(db, `workoutPrograms/${id}`), data);
    console.log("Workout program added successfully!");
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

export const getWorkoutPrograms = async () => {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "workoutPrograms"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data found.");
      return null;
    }
  } catch (error) {
    console.error("Error reading data:", error);
    return null;
  }
};

export const updateWorkoutProgram = async (id: string, data: Partial<WorkoutProps>) => {
    try {
      await update(ref(db, `workoutPrograms/${id}`), data); 
      console.log("Workout program updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

export const deleteWorkoutProgram = async (id: string) => {
  try {
    await remove(ref(db, `workoutPrograms/${id}`));
    console.log("Workout program deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
