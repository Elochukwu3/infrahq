import { motion } from "framer-motion";



export function MonthlyIssuanceChart({ className }) {
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  const personalizedData = [25, 65, 15, 85, 30, 40, 45];
  const instantData = [40, 90, 30, 90, 35, 60, 85];
  const yAxisLabels = [100, 80, 60, 40, 20, 0];
  const maxValue = 100;

  return (
    <div className={`w-full h-full flex ${className}`}>
      {/* Y-axis labels and grid lines */}
      <div className="flex flex-col justify-between mr-2 h-full">
        {yAxisLabels.map((label) => (
          <div key={label} className="relative flex items-center justify-end h-0">
            <span className="text-xs text-gray-400 mb-10">{label}</span>
            <div className="absolute right-0 w-[calc(100%+1rem)] h-px bg-gray-100 -translate-y-1/2"></div>
          </div>
        ))}
      </div>

      {/* Main chart area */}
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 flex flex-col justify-between">
            {yAxisLabels.slice(1).map((_, index) => (
              <div 
                key={`line-${index}`} 
                className="w-full h-px -mb-3 bg-gray-100"
              ></div>
            ))}
          </div>

          {/* Bars container */}
          <div className="absolute -bottom-5 w-full flex items-end justify-between h-full">
            {months.map((month, index) => (
              <div key={month} className="flex flex-col items-center h-full">
                <div className="relative w-8 sm:w-10 h-full flex items-end">
                  <motion.div
                    className="w-full bg-[#CCE2FF] rounded-t-sm"
                    style={{ height: `${(instantData[index]/maxValue)*100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(instantData[index]/maxValue)*100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                  <motion.div
                    className="absolute bottom-0 w-full bg-[#014DAF] rounded-t-sm"
                    style={{ height: `${(personalizedData[index]/maxValue)*100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(personalizedData[index]/maxValue)*100}%` }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}