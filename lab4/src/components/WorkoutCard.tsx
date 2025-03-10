import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

export interface WorkoutProps {
  name: string;
  description: string;
  availableDates: string[]; 
  registeredDates: string[]; 
  onRegister: (programName: string, date: string) => void;
}

const WorkoutCard = ({
  name,
  description,
  availableDates = [], 
  registeredDates = [], 
  onRegister,
}: WorkoutProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-semibold">{name}</h3>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <div className="mt-2">
          <strong>Available Dates:</strong>
          <ul>
            {availableDates.length > 0 ? (
              availableDates.map((date) => (
                <li key={date} className="flex justify-between items-center mb-2">
                  <span>{date}</span>
                  {registeredDates.includes(date) ? (
                    <span className="text-green-500">Registered</span>
                  ) : (
                    <Button
                      variant="default"
                      onClick={() => onRegister(name, date)}
                      className="cursor-pointer ml-2"
                    >
                      Register
                    </Button>
                  )}
                </li>
              ))
            ) : (
              <p>No available dates</p>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
