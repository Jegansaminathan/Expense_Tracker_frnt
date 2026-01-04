import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";

import {
  prepareStackedIncomeData,
  getColorFromSource
} from "../../utils/helper";

/* ---------------- CUSTOM TOOLTIP ---------------- */
const CustomTooltip = ({ active, payload}) => {
  if (!active || !payload?.length) return null;

  // Calculate total from stacked segments
  const total = payload.reduce(
    (sum, entry) => sum + (entry.value || 0),
    0
  );

  return (
    <div
      style={{
        background: "#fff",
        padding: "10px",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}
    >
      <div style={{ marginTop: 4, marginBottom: 8 }}>
        <strong>Total: ₹ {total}</strong>
      </div>

      {payload.map(entry => (
        <div
          key={entry.dataKey}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              background: entry.fill,
              borderRadius: "50%"
            }}
          />
          <span>{entry.dataKey}:</span>
          <strong>₹ {entry.value}</strong>
        </div>
      ))}
    </div>
  );
};

/* ---------------- BAR CHART ---------------- */
const IncomeBarChart = ({ data = [] }) => {
  const chartData = prepareStackedIncomeData(data);
  const sources = [...new Set(data.map(i => i.source))];

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />

          {sources.map(src => (
            <Bar
              key={src}
              dataKey={src}
              stackId="income"
              fill={getColorFromSource(src)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeBarChart;
