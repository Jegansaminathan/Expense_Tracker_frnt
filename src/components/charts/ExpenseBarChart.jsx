import React from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const ExpenseBarChart = ({ expensedata = [] }) => {

  // 🔥 Group by category
  const chartData = Object.values(
    expensedata.reduce((acc, curr) => {
      const cat = curr.category;

      if (!acc[cat]) {
        acc[cat] = { category: cat, total: 0 };
      }

      acc[cat].total += curr.amount;
      return acc;
    }, {})
  );

  return (
    <div style={{ width: "100%", minHeight: 320}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(v) => `₹ ${v}`} />
          <Bar dataKey="total" fill="#ef4444" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart ;
