import { CreditCard } from "lucide-react";
import { motion } from "framer-motion";


export function StatCard({ icon, title, value, change, period, alert, color }) {
  const iconColor = {
    green: "text-green-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
  }[color];

  const changeColor = change?.startsWith("+") ? "text-green-500" : "text-gray-500";

  return (
    <motion.div
      className="bg-white p-4 rounded-md shadow-sm border border-[#E2E2E2] space-y-3"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full bg-${color}-50`}>
          <CreditCard className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="text-sm text-[#0000008F] font-medium">{title}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center text-xs">
            <span className={`${changeColor} bg-green-100 px-2 py-1 rounded-md flex items-center gap-1`}>
              {change}
            </span>
            {period && <span className="text-gray-500 ml-1">{period}</span>}
          </div>
        )}
      </div>
      {alert && (
        <div className="text-xs text-orange-500 flex items-center gap-1">
          <span>⚠️</span> {alert}
        </div>
      )}
    </motion.div>
  );
}