import { motion } from "framer-motion";


export function WeeklyIncomeChart({ className }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dataPoints = [50, 39, 45, 38, 39, 17, 38];
  const yAxisLabels = [100, 80, 60, 40, 20, 0];
  const maxValue = 100;

  const points = dataPoints.map((point, i) => ({
    x: (i / (dataPoints.length - 1)) * 100,
    y: 100 - (point / maxValue) * 100,
  }));

  const pathData = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = points[i - 1];
    const cpx = (prev.x + point.x) / 2;
    return `${acc} S ${cpx},${prev.y} ${point.x},${point.y}`;
  }, "");

  return (
    <div className={`w-full h-full flex ${className}`}>
      {/* Y-axis labels */}
      <div className="flex flex-col justify-between mr-2 h-full">
        {yAxisLabels.map((label) => (
          <div key={label} className="text-xs text-gray-500 h-[16.6%] flex items-center justify-end pr-1">
            {label}
          </div>
        ))}
      </div>

      {/* Chart container */}
      <div className="flex-1 relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {yAxisLabels.slice(1).map((_, index) => (
            <div
              key={`line-${index}`}
              className="w-full h-px bg-gray-200"
            ></div>
          ))}
        </div>

        {/* SVG Chart */}
        <div className="w-full h-full pl-2 pr-4 pb-6">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d={`${pathData} L 100,100 L 0,100 Z`}
              fill="rgba(34, 197, 94, 0.1)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d={pathData}
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {points.map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="1.5"
                fill="white"
                stroke="#22c55e"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.5 + i * 0.05 }}
              />
            ))}
          </svg>
        </div>

        {/* X-axis day labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
          {days.map((day, index) => (
            <div key={index} className="text-xs text-gray-500 text-center" style={{ width: `${100 / days.length}%` }}>
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}