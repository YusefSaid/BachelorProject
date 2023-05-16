import React from 'react';
import data from './data.json'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
 
 
 
const transformChartData = (data) => {
  const liveProcesses = data['Live Processes'].chartData;
  const devProcesses = data['Development Processes'].chartData;
 
  const combinedData = liveProcesses.map((item, index) => {
    return {
      label: item.label,
      liveProcesses: item.value,
      devProcesses: devProcesses[index]?.value || 0,
    };
  });
 
  return combinedData;
};
 
const ChartTitle = ({ title }) => {
    return (
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {title}
      </h2>
    );
  };
 
const LineChartComponent = () => {
  const chartData = transformChartData(data);
 
  return (
    <div>
    <ChartTitle title="Live Processes vs Development Processes" />
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis>
            <Label angle={-90} value="Time Saved" position="insideLeft" style={{ textAnchor: 'middle' }} />
        </YAxis>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="liveProcesses" stroke="#303841" fillOpacity={0.3} fill="#8884d8" />
        <Line type="monotone" dataKey="devProcesses" stroke="#82ca9d" fillOpacity={0.3} fill="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
};
 
export default LineChartComponent;