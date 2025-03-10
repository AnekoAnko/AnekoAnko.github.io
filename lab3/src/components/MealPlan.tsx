import { useState } from "react";

interface IMeal {
  name: string;
  description: string;
  calories: number;
}

const meals: { [key: string]: IMeal[] } = {
  Monday: [
    { name: "Grilled Chicken Salad", description: "A healthy salad with grilled chicken, greens, and a light vinaigrette.", calories: 350 },
    { name: "Oatmeal with Berries", description: "A nutritious oatmeal with fresh berries and honey.", calories: 250 },
  ],
  Tuesday: [
    { name: "Veggie Stir Fry", description: "Stir fried vegetables with tofu and soy sauce.", calories: 400 },
    { name: "Greek Yogurt with Nuts", description: "A bowl of Greek yogurt topped with nuts and honey.", calories: 200 },
  ],
  Wednesday: [
    { name: "Salmon with Asparagus", description: "Grilled salmon with a side of roasted asparagus.", calories: 500 },
    { name: "Smoothie Bowl", description: "A refreshing smoothie bowl with fruits, granola, and seeds.", calories: 300 },
  ],
};

function MealPlan() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<IMeal | null>(null);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setSelectedMeal(null); 
  };

  const handleMealSelect = (meal: IMeal) => {
    setSelectedMeal(meal);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Meal Plan</h1>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Select a Day</h2>
        <div className="flex gap-4 mt-2">
          {Object.keys(meals).map((day) => (
            <button
              key={day}
              onClick={() => handleDaySelect(day)}
              className="p-2 border rounded hover:bg-gray-200 cursor-pointer"
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {selectedDay && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{selectedDay}'s Meals</h2>
          <div className="mt-2">
            {meals[selectedDay].map((meal, index) => (
              <div
                key={index}
                onClick={() => handleMealSelect(meal)}
                className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
              >
                <h3 className="font-bold">{meal.name}</h3>
                <p>{meal.description}</p>
                <p className="text-gray-500">Calories: {meal.calories}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMeal && (
        <div className="mt-4 p-4 border rounded shadow bg-gray-50">
          <h2 className="text-xl font-semibold">Selected Meal</h2>
          <h3 className="font-bold text-lg">{selectedMeal.name}</h3>
          <p>{selectedMeal.description}</p>
          <p className="text-gray-500">Calories: {selectedMeal.calories}</p>
        </div>
      )}
    </div>
  );
}

export default MealPlan;
