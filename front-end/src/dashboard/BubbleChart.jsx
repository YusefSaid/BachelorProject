import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import data from './data.json'; 
 
const ChartTitle = ({ title }) => {
    return (
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {title}
      </h2>
    );
  };
 
 
const CustomTooltip = ({ active, payload }) => {
if (active && payload && payload.length) {
    return (
    <div
        style={{
        backgroundColor: "#fff",
        border: "1px solid #cccccc",
        padding: "5px",
        }}
    >
        <p>Name: {payload[0].payload.name}</p>
        <p>Duration: {payload[0].payload.duration} min</p>
        <p>Frequency: {payload[0].payload.frequency}</p>
    </div>
    );
}
 
return null;
};
 
const CustomLegend = () => {
return (
    <div
    style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}
    >
    <div
        style={{
        display: "flex",
        alignItems: "center",
        marginRight: "10px",
        }}
    >
        <span
        style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#303841",
            marginRight: "5px",
        }}
        ></span>
        <span>Live Processes</span>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
        <span
        style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#82ca9d",
            marginRight: "5px",
        }}
        ></span>
        <span>Development Processes</span>
    </div>
    </div>
);
};  
 
const transformBubbleData = (data) => {
  const liveProcesses = data['Live Processes'].tableData;
  const devProcesses = data['Development Processes'].tableData;
 
  return [
    ...liveProcesses.map((item) => ({ ...item, category: 'Live Processes' })),
    ...devProcesses.map((item) => ({ ...item, category: 'Development Processes' })),
  ].sort((a, b) => a.duration - b.duration);
};
 
 
const BubbleChartComponent = () => {
  const bubbleData = transformBubbleData(data);
 
  return (
    <div>
    <ChartTitle title="Benefit Appreciation" />
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart data={bubbleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="duration" name="Duration" unit=" min" type="number">
            {/* <Label value="Duration (min)" offset={-3} position="insideBottom" style={{ textAnchor: 'middle' }} /> */}
        </XAxis>
        <YAxis dataKey="frequency" name="Frequency">
          <Label value="Frequency" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Scatter
          data={bubbleData.filter((item) => item.category === 'Live Processes')}
          nameKey="name"
          fillOpacity={0.8}
          stroke="#303841"
          fill="#303841"
        />
        <Scatter
          data={bubbleData.filter((item) => item.category === 'Development Processes')}
          nameKey="name"
          fillOpacity={0.8}
          stroke="#82ca9d"
          fill="#82ca9d"
        />
 
      </ScatterChart>
    </ResponsiveContainer>
    <CustomLegend />
    </div>
  );
};
 
export default BubbleChartComponent;