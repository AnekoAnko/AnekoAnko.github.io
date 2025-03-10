import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const progressData = [
    { date: "2024-02-01", weight: 70 },
    { date: "2024-02-15", weight: 69 },
    { date: "2024-03-01", weight: 68 },
  ];
 
const ProgressChart = () => {
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

export default ProgressChart;