import { Pie, PieChart, Sector, Tooltip, Cell } from "recharts";
import { useState,useEffect } from "react";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const isBalance = payload.name === "Balance";

  const outerOffset = isBalance ? 35 : 30;
  const lineOffset = isBalance ? 19 : 22;

  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  let x2, y2, x3, y3;

  if (isBalance) {
    // 👉 MIRROR L SHAPE (as in your image)
    x2 = sx + 22; // horizontal LEFT
    y2 = sy;

    x3 = x2;
    y3 = y2 + (sin > 0 ? 18 : -28); // vertical up/down
  } else {
    // default behavior for other slices
    const outerOffset = 30;
    const lineOffset = 22;

    x2 = cx + (outerRadius + outerOffset) * cos;
    y2 = cy + (outerRadius + outerOffset) * sin;

    x3 = x2 + (cos >= 0 ? 1 : -1) * lineOffset;
    y3 = y2;
  }
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />

      <path
        d={`M${sx},${sy} L${x2},${y2} L${x3},${y3}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={x3} cy={y3} r={2} fill={fill} />

      <text
        x={x3 + (payload.name === "Balance" ? -28 : (cos >= 0 ? 1 : -1) * 12)}
        y={y3 + (payload.name === "Balance" ? -30 : 0)}
        textAnchor={textAnchor}
        fill="#333"
      >
        ₹ {value}
      </text>

      <text
        x={x3 + (payload.name === "Balance" ? -28 : (cos >= 0 ? 1 : -1) * 12)}
        y={y3 + (payload.name === "Balance" ? -30 : 0)}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {(percent * 100).toFixed(2)}%
      </text>
    </g>
  );
};

const CustomPieChart = ({
  data = [],
  colors = [],
  isAnimationActive = true,
}) => {
  const balanceIndex = data.findIndex((item) => item.name === "Balance");
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (balanceIndex !== -1) {
      setActiveIndex(balanceIndex);
    }
  }, [balanceIndex]);

  const handleActivate = (_, index) => {
    setActiveIndex(index);
  };
  const isMobile = window.innerWidth < 768;
  return (
    <PieChart width='100%' height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="48%"
        innerRadius="50%"
        outerRadius="60%"
        dataKey="amount"
        isAnimationActive={isAnimationActive}
        onMouseEnter={!isMobile ? handleActivate : undefined}
        onClick={isMobile ? handleActivate : undefined}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CustomPieChart;
