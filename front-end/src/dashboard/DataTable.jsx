import React from 'react';
import data from './data.json'; 
 
const DataTable = () => {
  const liveProcesses = data['Live Processes'].tableData;
  const devProcesses = data['Development Processes'].tableData;
  const allData = [...liveProcesses, ...devProcesses];
 
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Frequency</th>
          <th>Duration</th>
          <th>Time Saved</th>
        </tr>
      </thead>
      <tbody>
        {allData.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.frequency} / month</td>
            <td>{item.duration} min</td>
            <td>{item.duration * item.frequency} min</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
 
export default DataTable;