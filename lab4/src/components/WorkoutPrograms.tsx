import { useEffect, useState } from "react";
import { updateWorkoutProgram } from "../firebase/firebaseService"; 
import { ref, get } from "firebase/database"; 
import WorkoutCard from "./WorkoutCard.tsx";
import { db } from "../firebase/firebase"; 

export interface WorkoutProps {
  name: string;
  description: string;
  availableDates: string[]; 
  registeredDates: string[]; 
  registrations: Record<string, boolean>; 
}

const WorkoutPrograms = () => {
  const [programs, setPrograms] = useState<WorkoutProps[]>([]);

  useEffect(() => {
    
    const fetchData = async () => {
        
      try {
        const snapshot = await get(ref(db, "workoutPrograms")); 
        if (snapshot.exists()) {
          const data = snapshot.val();
          const fetchedPrograms: WorkoutProps[] = Object.keys(data).map((key) => ({
            name: key,
            ...data[key], 
          }));
          setPrograms(fetchedPrograms); 
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };
    fetchData();
  }, []);
  
  const handleRegister = async (programName: string, date: string) => {
    const updatedPrograms = programs.map((program) => {
      if (program.name === programName) {
        const registeredDates = program.registeredDates || [];
  
        if (!registeredDates.includes(date)) {
          program.registeredDates = [...registeredDates, date];
        }
      }
      return program;
    });
  
    setPrograms(updatedPrograms); 
  
    const updatedProgram = programs.find((program) => program.name === programName);
  
    if (updatedProgram) {
      await updateWorkoutProgram(updatedProgram.name, {
        registeredDates: updatedProgram.registeredDates, 
      });
    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Workout Programs</h2>
      {programs.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program, index) => (
            <WorkoutCard
                key={program.name + index} 
                name={program.name}
                description={program.description}
                availableDates={program.availableDates}
                registeredDates={program.registeredDates}
                onRegister={handleRegister}
            />
            ))}

        </div>
      ) : (
        <p>No programs found.</p>
      )}
    </div>
  );
};

export default WorkoutPrograms;
