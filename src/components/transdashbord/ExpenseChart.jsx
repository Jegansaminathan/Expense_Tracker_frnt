import React, { useEffect, useState } from "react";
import { prepareBarChartData } from "../../utils/helper";
import ExpenseBarChart from "../charts/ExpenseBarChart";

const ExpenseChart = ({ hisexp}) => {
  const [chartdata, setCd] = useState([]);
  useEffect(() => {
    const result = prepareBarChartData(hisexp);
    setCd(result);
    return () => {};
  }, [hisexp]);
  return (
    <div className="transpie" style={{gap:'10px'}}>
      <h4>Expense Chart</h4>
      <ExpenseBarChart expensedata={chartdata}/>
    </div>
  );
};

export default ExpenseChart;
