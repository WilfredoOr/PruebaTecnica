import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const InventoryChart = ({ data }) => {
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

  
  const chartData = data.map(item => ({
    name: item.product_name, 
    value: item.stock_available, 
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData} 
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`} 
        outerRadius={80}
        fill="#8884d8"
        dataKey="value" 
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default InventoryChart;